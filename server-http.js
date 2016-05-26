var express = require('express');
var compression = require('compression');
bodyParser = require('body-parser');
var zlib = require('zlib');
var app = express();
var count = 0;

app.use(bodyParser.json({inflate: true}));
app.use(compression({threshold: 1}));

app.post('/', function (req, res, next) {
    console.log(req.body);
    console.log(count++);
    res.send({success: 'OK'});
    next();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});