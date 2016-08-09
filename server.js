"use strict";
var express = require('express');
var app = express();
var path = require('path');
var ua = require('ua-parser');

app.use(express.static(path.resolve(__dirname)));

app.get('/', function (req, res) {
    var header = { "ip": null, "lang": null, "os": null};
    var parsed = ua.parse(req.headers['user-agent']);
    var match = /(,|;)/;
    res.writeHead(200, {"Content-Type": "text/json"});

    header.ip = req.ip;
    header.lang = JSON.stringify(req.headers["accept-language"]);
    header.lang = header.lang.substring(1, header.lang.search(match));
    header.os = parsed.os.toString();

	res.end(JSON.stringify(header));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
