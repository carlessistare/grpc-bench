var PROTO_PATH = process.env.PROTO;

var grpc = require('grpc');
var async = require('async');
var fs = require('fs');
var path = require('path');
var ogury_proto = grpc.load(PROTO_PATH).ogury;

var message = require(process.env.MESSAGE);

function main() {

    var ca_path = path.join(__dirname, './keys/server.crt');
    var ca_data = fs.readFileSync(ca_path);
    var client = new ogury_proto.Data(process.env.HOST + ':50052', grpc.credentials.createSsl(ca_data));
    var newReq = function() {
        return function(callback) {

            client.sendMessage(message, function(err, response) {
                console.log('Response:', response);
                setTimeout(callback, 10000);
            });


        }
    }

    var tasks = [];
    for (var i = 0; i < 1; i++) {
        tasks[i] = newReq();
    }
    async.series(tasks, function() {
        console.log("DONE!!");
    });

}

main();
//function start() {
//    // your code here
//    setTimeout(start, 500);
//}
//
//// boot up the first call
//start();
