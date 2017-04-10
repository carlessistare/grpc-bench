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

function sendMessageStreamDuplex(call) {
    call.on('data', function(message) {
        console.log(count++);
        // console.log(message);
        call.write({id: message.id, success: 'OK'});
    });
    call.on('end', function() {
        console.log("BYE");
        call.end()
    });
}

function main() {
    var server = new grpc.Server();
    server.addProtoService(ogury_proto.Data.service, {sendMessage: sendMessage, sendMessageStream: sendMessageStream, sendMessageStreamDuplex: sendMessageStreamDuplex});

    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
