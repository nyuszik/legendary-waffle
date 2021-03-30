let { createServer } = require("http"); // new server instance with create server function built into nodejs
let server = createServer; 
let fs = require('fs');
let path = require('path');
let hostname = "127.0.0.1"; // specified hostname in event of change later
let port = process.env.port || 6969; // specified port in event of change later

// set server to display response contents on index
server(function (request, response) {
    console.log('request ', request.url);

    let filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    let extname = String(path.extname(filePath)).toLowerCase();
    let mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        // OVER RIDING CORS to allow for access from external demand/files 
        // Website you wish to allow to connect
        response.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        response.setHeader('Access-Control-Allow-Credentials', true);

        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(port, hostname, function () {
    // ran server using port specified in env variables, with fallback on 6969
    console.log(`starting server at http://${hostname}:${port}/`);
});

/* Alternative notation note:
let http = require('http');

http.createServer((request, response) => {
    response.end("Legeondary Waffle");
}).listen(6969);
*/

// TO-DO
// incorporate something like this for no writable socket errors
/* else if (error.code === 'ECONNRESET' || !socket.writable) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  } */


  // does NOT require explicit extension in root, but requires extension in folders