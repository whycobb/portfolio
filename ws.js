var http = require('http'),
		port = process.argv[2] || 1178;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(parseInt(port, 10)); 

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");