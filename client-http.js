var request = require('request');
var express = require('express');
var app = express();


var message = require(process.env.MESSAGE);

app.get('/ping', function (req, res) {
    var options = {
        url: 'http://' + process.env.HOST + ':3000/',
        rejectUnauthorized : false,
        json: true,
        body: {api_key: "123445", version: "1.4.0", field1: "test-test"}
    }
    request.post(options, function(err){
        if (err)  console.log(err);
        // console.log(body);
        res.status(200).send({});
    });
});
app.listen(8080);
