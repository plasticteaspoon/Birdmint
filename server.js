var express = require('express');
var books = require('./books/books.js');
var tasks = require('./todolist/todolist.js');
var config = require('config');

console.log(books.banana);

var app = express();

app.use(express.static(__dirname + '/wwwroot'));

app.get('/', function (request, response) {
    response.redirect('/home.html');
});

books.addRoutes(app);
tasks.addRoutes(app);

var serverPort =config.get("serverPort"); 

app.listen(serverPort, function () {
    console.log('Server started on port ' + serverPort);
});