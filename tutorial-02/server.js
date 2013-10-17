/************************************************************
 * server.js : a simple server that emits valid Cj responses
 * 2013-10 : @mamund
 ***********************************************************/

var url = require('url');
var http = require('http');
var port = process.env.PORT||1337;

var path = '';
var base = '';
var cType = {'Content-Type':'application/json'};
var pathFilter = 'favicon.ico';
var response = null;

function handler(req, res) {
    // get request context
    base = 'http://' + req.headers.host;
    path = url.parse(req.url).pathname;
    if(pathFilter.indexOf(path)!==-1) {
        path = '/';
    }

    // route request
    switch(path) {
        case '/':
        case '/basic':
            response = basicResponse();
            break;
        default:
            response = basicResponse();
            break;
    }
    
    if(response!==null) {
        res.writeHead(response.status, response.desc, cType);
        res.end(response.body);
    }
    else {
        res.writeHead(500,"Server Error","text/plain");
        res.end();
    }
}

function basicResponse() {
    var rsp, cj;
    
    cj = {};
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base;
    cj.collection.links = [];
    cj.collection.links.push({'rel' : 'home', 'href' : base + path});
    
    rsp = {};
    rsp.status = 200;
    rsp.desc = 'OK';
    rsp.body = JSON.stringify(cj);

    return rsp;
}

// listen for requests
http.createServer(handler).listen(port);


