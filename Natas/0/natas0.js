const http = require('http');

let username = 'natas0';
let password = username;
let options = {
    host: `${username}.natas.labs.overthewire.org`,
    port: 80,
    method: 'GET',
    auth: `${username}:${password}`,
}



let request = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', data => {
        console.log(data.match(/([0-9]|[a-zA-Z]){32}/)[0]);
    });
});

request.on('error', error => {
    console.log(error)
});

request.end();