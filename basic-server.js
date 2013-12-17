var http = require('http');
var path = require('path');
var fs = require('fs');

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(function(req, res){
  console.log("Serving request type " + req.method + " for url " + req.url);
  if (req.url === '/'){
    fs.readFile(__dirname + '/public/index.html', function (err, fileContents){
      if (err) console.error(err);
      else{
        res.writeHead(200, {});
        res.end(fileContents);
      }
    });
  } else {
    fs.readFile(__dirname + '/public' + req.url, function (err, fileContents){
      if (err) {
        console.error(err);
        res.writeHead(404, {});
        res.end();
      } else{
        res.writeHead(200, {});
        res.end(fileContents);
      }
    });
  }
}).listen(port, ip);
console.log("Listening on http://" + ip + ":" + port);