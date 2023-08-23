var http = require('http'),
		dt = require('./ycDTModule.js'),
		port = process.argv[2] || 1178;

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
	
  response.write("Current date + time: " + dt.getDateTime() + "; URL was '" + request.url + "'");
	response.end();
}).listen(parseInt(port, 10)); 

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");