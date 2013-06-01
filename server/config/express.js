
var express = require('express'),
    path = require('path');

module.exports = function(app, config) {

// all environments
    app.set('clientId', "622111695111.apps.googleusercontent.com");
    app.set('clientSecret', "beFu03GM8MPCmRb7nvzWcXeG");
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(config.root, 'public')));

// development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
}