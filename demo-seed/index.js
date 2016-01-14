
// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
// http://shawnsimondeveloper.com/nodeproxyangular/

var express = require('express');
var httpProxy = require('http-proxy');

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

var server = express();
server.set('port', 3000);
server.use(express.static(__dirname + '/app'));


var httpsProxyOptions = {
    changeOrigin: true,
    target: 'https://crateandbarreldemo.groupbycloud.com'
};

var httpProxyOptions = {
    target: 'http://crateandbarreldemo.groupbycloud.com'
};

var apiProxy = httpProxy.createProxyServer();

// Grab all requests to the server with "/api/".
server.all("/:type(api|admin)/*", function(req, res) {
    console.log("Request made to /api/ " + req.url );

    sayt = '/api/v1/sayt/'
    if(req.url.slice(0, sayt.length) == sayt){
    	console.log("using sayt url");
 		apiProxy.web(req, res, httpProxyOptions);
    	return;
    } 

    apiProxy.web(req, res, httpsProxyOptions);
});

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});