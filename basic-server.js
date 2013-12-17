var http = require('http');
var path = require('path');
var fs = require('fs');

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(function(req, res){
  console.log("Serving request type " + req.method + " for url " + req.url);
  if (req.url === '/'){
    res.writeHead(302, {'Location': 'public/index.html'});
    res.end();
  } else if (req.url.split(path.sep)[1] === 'public'){
    res.end(fs.readFileSync(__dirname + req.url));
  } else {
    res.end();
  }
}).listen(port, ip);
console.log("Listening on http://" + ip + ":" + port);