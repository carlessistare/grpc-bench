var express = require('express');
bodyParser = require('body-parser');
var app = express();
var count = 0;

app.use(bodyParser.json());

app.post('/', function (req, res, next) {
    // console.log(req.body);
    console.log(count++);
    res.send({success: 'OK'});
    next();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});