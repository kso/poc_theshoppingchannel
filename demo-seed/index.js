
// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
// http://shawnsimondeveloper.com/nodeproxyangular/

var express = require('express');
var httpProxy = require('http-proxy');

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

var server = express();
server.set('port', 8000);
server.use(express.static(__dirname + '/app'));

var proxyOptions = {
    changeOrigin: true,
    target: 'https://crateandbarreldemo.groupbycloud.com'
};

var apiProxy = httpProxy.createProxyServer();

// Grab all requests to the server with "/api/".
server.all("/:type(api|admin)/*", function(req, res) {
    console.log("Request made to /api/ " + req.url );

    apiProxy.web(req, res, proxyOptions);
});

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});

//direct all other URLs to the client
server.get('*', function(req, res) {
  console.log("Sending request " + req.url + " to client" );
  res.sendFile(__dirname + '/app/index.html');
});