var http = require('http'),
		dt = require('./ycDTModule.js'),
		port = process.argv[2] || 1178;

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
	
	var q = url.parse(request.url, true).query;
	var txt = q.year + " " + q.month;
	
  response.write("Current date + time: " + dt.getDateTime() + "; URL was '" + request.url + "'\n" + txt);
	response.end();
}).listen(parseInt(port, 10)); 

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");