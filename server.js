var express = require('express');
var books = require('./books/books.js');
var tasks = require('./todolist/todolist.js');
var config = require('config');
var session = require('express-session');
var bodyParser = require('body-parser');
var Database = require('nedb');

console.log(books.banana);

var app = express();
var db = new Database({ filename: __dirname + '/login.nedb', autoload: true });

app.use(express.static(__dirname + '/wwwroot'));
app.use(session({'secret':'1234', 'resave':false, 'saveUninitialized':true}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.redirect('/home.html');
});

app.post('/api/login', function (request, response) {
    db.find({username: request.body.username, password: request.body.password}, function (err, users) {
        if(users.length != 0) {
            request.session.authenticated = true;
            request.session.user = users[0];
            response.send();
        } else {
            request.session.authenticated = false;
            request.session.user = null;
            response.status(401);
            response.send();
        }
    });

});

books.addRoutes(app);
tasks.addRoutes(app);

var serverPort =config.get("serverPort"); 

app.listen(serverPort, function () {
    console.log('Server started on port ' + serverPort);
});