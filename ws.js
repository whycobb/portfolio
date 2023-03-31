var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 1178;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  fs.exists(filename, function(exists) {
    if(!exists) {
    //  response.writeHead(404, {"Content-Type": "text/plain"});
    //  response.write("404 Not Found\n");
    //  response.end();
			filename = '/404.html';
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
			
			
			//Checking MIME types
			let fileExtension = filename.split('.').pop();
			let contentType = "";
			
			if (fileExtension == "js") {
				contentType = "text/javascript";
			}
			
			if (fileExtension == "html") {
				contentType = "text/html";
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
