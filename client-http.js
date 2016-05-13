var request = require('request');
var async = require('async');

var message = require(process.env.MESSAGE);

var newReq = function() {
    return function(callback) {
        request.post({url:'http://' + process.env.HOST + ':3000', json: true, body: message}, function(err,httpResponse,body){
            console.log(body);
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


