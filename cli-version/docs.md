pad.js

Total fancy node.js webserver for transferring files from/to browser console and terminal

What is this? (stackoverflow)
Setup:

curl pad.js.org | node
Or:

curl pad.js.org | PORT=9090 node
Or without curl:

wget -O- pad.js.org | node
You should probably use this instead if you are using Debian/Ubuntu based Linux distribution:

curl pad.js.org | nodejs
And try this on Windows:

powershell -Command "(iwr pad.js.org).Content | node"
Or this which doesn't need curl/powershell:

node -e "require('http').request({host:'pad.js.org'},function(r){var t='';r.on('data',function(c){t+=c});r.on('end',function(){eval(t)})}).end();"
Or this sets it up as a Docker daemon which exposes pad.js on 7070 of all your interfaces:

docker run --restart=always -v /files:/files --name pad.js -d -p 7070:9090 quay.io/ebraminio/pad.js
Use this if you want to have it as a terminal tool: (please install nodejs-legacy on Debian before the installation)

npm install -g pad.js
pad [PORT]
HTTPS:

sudo mkdir /etc/ssl/pad.js
sudo openssl genrsa -out "/etc/ssl/pad.js/pad.js.key" 2048
sudo openssl req -new -key "/etc/ssl/pad.js/pad.js.key" -out "/etc/ssl/pad.js/pad.js.csr"
sudo openssl x509 -req -days 365 -in "/etc/ssl/pad.js/pad.js.csr" -signkey "/etc/ssl/pad.js/pad.js.key" -out "/etc/ssl/pad.js/pad.js.crt"
Then run locally installed pad.js like:
pad --https
or: (needs Node.js 8)
curl pad.js.org | node - --https
or: (works only on macOS, at least for now)
curl pad.js.org | node /dev/stdin --https
Show cases:

download a file from the place the server is ran from:
fetch('http://127.0.0.1:9090/a.txt')
  .then(x => x.text())
  .then(x => console.log('File content: ' + x));
upload a text file:
var formData = new FormData();
formData.append('blob', new Blob(['STRING YOU LIKE TO SAVE']));
fetch('http://127.0.0.1:9090/a.txt', { method: 'POST', body: formData })
  .then(x => x.text())
  .then(console.log);
upload a file:
// Create a canvas, make 200x200 blue rectangle on it, upload its base64 encoded binary
var canvas = document.createElement('canvas'), context = canvas.getContext('2d');
canvas.width = 200; canvas.height = 200; context.fillStyle = 'blue'; context.fillRect(0, 0, 200, 200);
canvas.toBlob(function (blob) {
  var formData = new FormData();
  formData.append('blob', blob);
  fetch('http://127.0.0.1:9090/a.png', { method: 'POST', body: formData })
    .then(x => x.text())
    .then(console.log);
});
upload a file from terminal:
curl -F "file=@a.png" http://127.0.0.1:9090/a.png
Source