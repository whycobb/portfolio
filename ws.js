var http = require('http'),
		url = require('url'),
    path = require("path"),
		fs = require('fs'),
		port = process.argv[2] || 1178;
		
//bank of variables that get used all over the place
var today = new Date();
var fileType = "";
var page;
var month = today.getFullYear() + "-" + (today.getMonth()+1);

var proceed = true;



//Log server boot
var initLog = "--SERVER BOOT " 
							+ (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + " " +
							+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "\n";

fs.appendFile('./Logs/guestbook_' + month + '.csv', initLog, function (err) {
	if (err) throw err;
	console.log('Saved!');
});




//main function
http.createServer(function (request, response) {
	proceed = true;
	var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
		
	fs.exists(filename, function(exists) {	//'exists' is a variable passed into this inline-defined callback function
    if(!exists) {	//404 case
			proceed = false;
			console.log("File not found - " + filename);
			
			fs.readFile("404.html", "binary", function(err, file) {
				if(err) {
					response.writeHead(404, {"Content-Type": "text/plain"});
					response.write("404 Not Found\n");
					response.end();
					return;
				}
				
				response.writeHead(404, {"Content-Type": "text/html"});
				response.write(file, "binary");
				response.end();
				return;
			});
		
    }	
	
		if (!proceed) return;
	
		page = url.parse(request.url, true);
		
		fileType = page.pathname.split('.').pop();
		let contentType = "";
		contentType = parseMime(fileType);
		
		logTraffic(request);	//print server log
		
		if (fs.statSync(filename).isDirectory()) filename += '/index.html';		//if the url is a directory, look for index.html inside
		
		fs.readFile(filename, "binary", function(err, file) {	//file is passed in from the read function
			if(err) {        //catch-all error meaning "something broke insidethe server"
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}
			
		//	res.setHeader("Content-Type", mime.lookup(url)); //Solution!
		//	response.setHeader("Content-Type", "text/html"); //Solution!

			response.writeHead(200, {"Content-Type": contentType});
			response.write(file, "binary");
			response.end();
		});
	});
}).listen(parseInt(port, 10)); 

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");




//Prints to a log file. Takes the http request as a parameter.
function logTraffic(request) {
	if (fileType == "html" || fileType[fileType.length-1] == '/') {
		console.log("This is a page request!");
	
		today = new Date();
		month = today.getFullYear() + "-" + (today.getMonth()+1);
		var logName = './Logs/guestbook_' + month + '.csv';
		var fullDate = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear()
		let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress || "0.0.0.0";
		let agent = request.headers['user-agent'];
		
		let logText = fullDate + "," +
									today.getDate() + "," +
									today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "," +
									ip + "," +
									page.pathname + "," +
									agent
									+ "\n";
		
		fs.exists(logName, function(exists) {	//'exists' is a variable passed into this inline-defined callback function
			if (!exists) {
				console.log("Creating log file " + month);
				
				var newLogText = "--NEW LOG " + month + "-" + today.getDate() + " " +
							+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "\n";
				
				fs.appendFile(logName, newLogText, function (err) {
					if (err) throw err;
				});
			}
			
			fs.appendFile(logName, logText, function (err) {
				if (err) throw err;
			//	console.log('Saved!');
			});
		});
	}
}



//MIME types by hand... make this more robust
function parseMime(fileType) {
	let contentType = "";

	if (fileType == "js") {
		contentType = "text/javascript";
	}
	
	if (fileType == "html") {
		contentType = "text/html";
	}
	
	return contentType;
}

