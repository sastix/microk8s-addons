var express = require('express'),
    https = require('https'),
    fs = require('fs'),
    app = express(),
    port = process.env.PORT || 3000,
    ssl = process.env.SSL || false,
    sslCA = process.env.SSL_CA || '/data/common/sslcert/ca.crt',
    sslCERT = process.env.SSL_CERT || '/data/common/sslcert/microk8s-web-console.crt',
    sslKEY = process.env.SSL_KEY || '/data/common/sslcert/microk8s-web-console.key',
    appName = process.env.APP_NAME || 'web-console',
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes;
var routeForAppExists = false;
switch (appName){
    case 'web-console':
        routes = require('./routes/webRoutes');
        routeForAppExists = true;
        break;
    case 'api':
        routes = require('./routes/apiRoutes');
        routeForAppExists = true;
        break;

}

if(!routeForAppExists){
    console.log("No route found for app '"+appName+"'. Exiting...");
    process.exit();
}

routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

if(!ssl) {
    app.listen(port);
}else{
    var options = {
        requestCert: true,
        rejectUnauthorized:true,
        key: fs.readFileSync(sslKEY),
        cert: fs.readFileSync(sslCERT),
        ca: fs.readFileSync(sslCA),
    };

    var httpsServer = https.createServer(options, app);
    httpsServer.listen(port);
}

console.log(appName+' server started on: ' + port +' ssl: '+ssl);
