var http = require('http'),
		dt = require('./ycDTModule.js'),
		port = process.argv[2] || 1178;

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Current date + time: " + dt.getDateTime());
	response.end();
}).listen(parseInt(port, 10)); 

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");