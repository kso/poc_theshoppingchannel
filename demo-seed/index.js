'use strict';

// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
// http://shawnsimondeveloper.com/nodeproxyangular/

var express = require('express');
var httpProxy = require('http-proxy');
var https = require('https');

httpProxy.prototype.onError = function (err) {
    console.log(err);
};


var appName = "/cb/";
var server = express();
server.set('port', 8000);
server.use(appName, express.static(__dirname + '/app'));


// Improve perforamnce of node-proxy by using a shared agent with keepAlive = true: 
// https://github.com/nodejitsu/node-http-proxy/issues/614
// https://github.com/nodejitsu/node-http-proxy/issues/929
var httpsAgent = new https.Agent({ keepAlive:true, maxSockets:10 });

var proxyOptions = {
    changeOrigin: true,
    target: 'https://crateandbarreldemo.groupbycloud.com',
    agent: httpsAgent
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);

var logPost = function(request){
    if(request.method !== 'POST')   
        return;

    var body = "";
    request.on('data', function (chunk) {body += chunk;});
    request.on('end', function () { console.log('POSTED DATA: ' + body);});
};


// Grab all requests to the server with "/api/".
server.all(appName + ":type(api|admin)/*", function(req, res) {

    //remove the application path from start of url
    var re = /^\/[^\/]+(.*)$/;
    var matches = req.url.match(re);

    if(matches[1]){
        req.url = matches[1];
    }
    console.log("Request made to " + req.url );

    //debug code to log search requests
    logPost(req);

    var start_time = new Date().getTime();

    apiProxy.web(req, res);

    res.on('finish', function() {
       console.log("The request was proxied in " + (new Date().getTime() - start_time) + "ms");
    });

});

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});

//direct all other URLs to the client
server.get('*', function(req, res) {
  console.log("Sending request " + req.url + " to client" );
  res.sendFile(__dirname + '/app/index.html');
});