var http = require('http'),
		fs = require('fs'),
		dt = require('./ycDTModule.js'),
		port = process.argv[2] || 1178;


http.createServer(function (request, response) {
	fs.appendFile('./Logs/serverLog.log', 'Hiii\n', function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
	
	fs.readFile('index.html', function(err, data) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		return response.end();
	});
	
	
	
	
//  response.writeHead(200, {'Content-Type': 'text/html'});
	
//  response.write("Current date + time: " + dt.getDateTime() + "; URL was '" + request.url + "'");
//	response.end();
}).listen(parseInt(port, 10)); 

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");