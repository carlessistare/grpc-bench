var fs = require('fs');
var path = require('path');

var PROTO_PATH = process.env.PROTO;

var grpc = require('grpc');
var ogury_proto = grpc.load(PROTO_PATH).ogury;

var count = 0;

function sendMessage(call, callback) {
    console.log(call.request);
    console.log(count++);
    callback(null, {success: 'OK'});
}

function sendMessageStream(call, callback) {
    call.on('data', function(message) {
        console.log(count++);
        console.log(message);
    });
    call.on('end', function() {
        callback(null, {success: 'OK'});
    });
}

function main() {
    var server = new grpc.Server();
    server.addProtoService(ogury_proto.Data.service, {sendMessage: sendMessage, sendMessageStream: sendMessageStream});
    var key_path = path.join(__dirname, './keys/server.key');
    var pem_path = path.join(__dirname, './keys/server.crt');

    var key_data = fs.readFileSync(key_path);
    var pem_data = fs.readFileSync(pem_path);
    server_creds = grpc.ServerCredentials.createSsl(null,
        [{private_key: key_data,
            cert_chain: pem_data}]);
    server.bind('0.0.0.0:50052', server_creds);
    server.start();
}

main();
