const http = require('http');
const fs = require('fs');

let username = 'natas2';
let password = 'ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi';
let options = {
    host: `${username}.natas.labs.overthewire.org`,
    path: '/files/users.txt',
    port: 80,
    method: 'GET',
    auth: `${username}:${password}`,
}
const picturepath = 'pixel.png';
let request = http.request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', data => {
        fs.writeFile(picturepath, data);
        console.log(data.match(/([0-9]|[a-zA-Z]){32}/)[0]);
    });
});


request.on('error', error => {
    console.log(error)
});

request.end();