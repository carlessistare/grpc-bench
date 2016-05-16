var express = require('express');
var https = require('https');
var fs = require('fs');
bodyParser = require('body-parser');
var app = express();
var count = 0;

var options = {
    key  : fs.readFileSync('./keys/server.key'),
    cert : fs.readFileSync('./keys/server.crt')
}
app.use(bodyParser.json());

app.post('/', function (req, res, next) {
    // console.log(req.body);
    console.log(count++);
    res.send({success: 'OK'});
    next();
});

https.createServer(options, app).listen(3000, "grpc-test.ogury.io", null, function() {
    console.log('Server listening on port 3000');
});