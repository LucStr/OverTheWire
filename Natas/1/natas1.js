const http = require('http');
const fs = require('fs');

let username = 'natas1';
let password = 'gtVrDuiDfck831PqWsLEZy5gyDz1clto';
let options = {
    host: `${username}.natas.labs.overthewire.org`,
    port: 80,
    method: 'GET',
    auth: `${username}:${password}`,
}

let request = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', data => {
        //fs.writeFile('index.html', data);
        console.log(data.match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0]);
    });
});

request.on('error', error => {
    console.log(error)
});

request.end();