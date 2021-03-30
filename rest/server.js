const hostname = "127.0.0.1"; // specified hostname in event of change later
const port = process.env.port || 6969; // specified port in event of change later
const server = require("./controller.js"); 

// ran server using port specified in env variables, with fallback on 6969
server.listen(port, hostname, () => {
    console.log(`starting server at http://${hostname}:${port}/`);
});

// Architecture Notes:
/* Server is an instance of http.Server class,
which inherits from net.Server,
which subsequently inherits from EventEmitter.

Because the request option is most commonly used,
the server was created with server.on, but 
we can also use:

createServer((request, response) => {
    response.end("Legeondary Waffle");
}).listen(6969);
*/

// If not needing to incorporate a simple REST API function, check out the default folder option 