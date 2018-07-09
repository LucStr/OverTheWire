const http = require('http');
const fs = require('fs');
const atob = require('atob');
const btoa = require('btoa');
const querystring = require('querystring');

let username = 'natas11';
let password = 'U82q5TCMMQ9xuFoI3dYX61s7OZD9JKoK';

let options = {
    host: `${username}.natas.labs.overthewire.org`,
    path: '/?bgcolor=%23ffffff',
    auth: `${username}:${password}`,
}

let request = http.request(options, (res) => {
    res.setEncoding('utf8');
    let data = getCookies(res).filter(e => e.name == 'data')[0].value;
    let decodedData = atob(data);
    let key = xor_decrypt(decodedData, '{"showpassword":"no","bgcolor":"#ffffff"}')
        .substring(0, 4);
    decodedData = xor_decrypt('{"showpassword":"yes","bgcolor":"#ffffff"}', key);
    data = btoa(decodedData);
    requestWithCookies(options, {
        data
    });
});

request.on('error', error => {
    console.log(error)
});

request.end();

function xor_decrypt(input, key){
    let output = '';
    for(let i = 0; i < input.length; i++){        
        output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return output;
}

function getCookies(response){
    var setcookie = response.headers["set-cookie"];
    if ( setcookie ) {
      return setcookie.map((cookiestr) => {
            let parsed = decodeURIComponent(cookiestr).match(/(.+)=(.+)/);
            return {
                name: parsed[1],
                value: parsed[2]
            }
        }
      );
    }
    return {};
}

function requestWithCookies(options, cookies){
    if(!options.headers)
        options.headers = {};
    options.headers['Cookie'] = querystring.stringify(cookies); 

    let request = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', data => {
            console.log(data.match(/([0-9]|[a-zA-Z]){32}/g).filter(e => e != password)[0]);
        })
    });

    request.on('error', error => {
        console.log(error)
    });
    
    request.end();
}
