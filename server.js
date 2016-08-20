var express = require('express');
var books = require('./books/books.js');
var tasks = require('./todolist/todolist.js');
var config = require('config');
var session = require('express-session');
var bodyParser = require('body-parser');

console.log(books.banana);

var app = express();

app.use(express.static(__dirname + '/wwwroot'));
app.use(session({'secret':'1234', 'resave':false, 'saveUninitialized':true}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.redirect('/home.html');
});

app.post('/api/login', function (request, response) {
    if(request.body.password == 'pingpong') {
        request.session.authenticated = true;        
        response.send();
    } else {
            response.status(401);
            response.send();
    }
});

books.addRoutes(app);
tasks.addRoutes(app);

var serverPort =config.get("serverPort"); 

app.listen(serverPort, function () {
    console.log('Server started on port ' + serverPort);
});