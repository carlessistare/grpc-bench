var zlib = require('zlib');
var http = require('http');

var message = require(process.env.MESSAGE);

var options = {
    hostname: process.env.HOST,
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Content-Encoding': 'gzip', 'Accept-Encoding': 'gzip'}
};
zlib.gzip(JSON.stringify(message), function (err, buffer) {
    var req = http.request(options, function(res) {
//        res.setEncoding('utf8');// note: not requesting or handling compressed response
        var gunzip = zlib.createGunzip();
        buffer = [];
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            console.log(JSON.parse(buffer.join("")));

        }).on("error", function(e) {
            console.log(e);
        })
    });
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(buffer); // send compressed data
    req.end();
});