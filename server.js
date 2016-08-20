var express = require('express');
var books = require('./books/books.js');
var tasks = require('./todolist/todolist.js');

console.log(books.banana);

var app = express();

app.use(express.static(__dirname + '/wwwroot'));

app.get('/', function (request, response) {
    response.redirect('/home.html');
});

books.addRoutes(app);
tasks.addRoutes(app);

app.listen(8080, function () {
    console.log('Server started');
});