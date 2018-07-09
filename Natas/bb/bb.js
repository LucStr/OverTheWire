const http = require('http');
const fs = require('fs');

let username = 'natas';
let password = 'W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl';

let options = {
    host: `${username}.natas.labs.overthewire.org`,
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
