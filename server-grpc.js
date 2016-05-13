var PROTO_PATH = process.env.PROTO;

var grpc = require('grpc');
var ogury_proto = grpc.load(PROTO_PATH).ogury;

var count = 0;

function sendMessage(call, callback) {
    // console.log(call.request);
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
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
