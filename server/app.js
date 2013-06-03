/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , fs = require("fs")
    , path = require('path');


var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config')[env];

var app = express();

require("./config/express")(app, config);

require("./config/routes")(app, config);

var options = {
    key: fs.readFileSync('./ssl/privatekey.pem'),
    cert: fs.readFileSync('./ssl/certificate.pem'),
};
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
