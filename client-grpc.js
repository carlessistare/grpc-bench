var PROTO_PATH = process.env.PROTO;

var grpc = require('grpc');
var async = require('async');
var ogury_proto = grpc.load(PROTO_PATH).ogury;

var message = require(process.env.MESSAGE);

function main() {
    var client = new ogury_proto.Data(process.env.HOST + ':50051', grpc.credentials.createInsecure());

    var newReq = function() {
        return function(callback) {
            client.sendMessage(message, function(err, response) {
                console.log('Response:', response);
                callback();
            });

        }
    }

    var tasks = [];
    for (var i = 0; i < 1000; i++) {
        tasks[i] = newReq();
    }
    async.series(tasks, function() {
        console.log("DONE!!");
    });

}

main();