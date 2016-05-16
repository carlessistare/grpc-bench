var request = require('request');
var async = require('async');
var fs = require('fs');

var message = require(process.env.MESSAGE);

var newReq = function() {
    return function(callback) {
        var options = {
            url: 'https://' + process.env.HOST + ':3000/',
            rejectUnauthorized : false,
            json: true,
            body: message
        }
        request.post(options, function(err,httpResponse,body){
            if (err)  console.log(err);
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


