var express = require('express');
var serveStatic = require('serve-static');

//this is to allow th use of the app.js as the routes 
var app = require('./app.js');
var port = 8082;
app.use(serveStatic(__dirname + '/public'));

var server = app.listen(port, function () {
    console.log('Back-End Server Hosted at http://localhost:%s', port);
});