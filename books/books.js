var http = require('http');
var httpRequest = require('request');
var url = require('url');
var bodyParser = require('body-parser');
var Database = require('nedb');

var db = new Database({ filename: __dirname + '/books.nedb', autoload: true });
exports.banana = "Banana!!!"
exports.addRoutes = function (app) {
    app.use(bodyParser.json());

    app.get('/isbnSearch', function (request, response) {
        var query = url.parse(request.url, true).query;
        httpRequest('http://isbndb.com/api/v2/json/BGAPMWFY/book/' + query.isbn, function (error, bookResponse, body) {
            if(!error && bookResponse.statusCode == 200) {
                response.setHeader('ContentType','application/json');
                response.send(body);
            } else {
                response.statusCode = 500;
                response.send();
            }
        });
        
    });

    //BOOK API

    //get all the books
    app.get("/api/book", function (request, response) {
        console.log("Here's a message from session " + request.session.hi);
        db.find({}, function (err, books) {
            response.setHeader('ContentType', 'application/json');
            response.send(books);
        });
    });

    //get a book
    app.get("/api/book/:id", function (request, response) {
        response.setHeader('ContentType', 'application/json');
        response.send({});
    });

    //add a book
    app.post("/api/book", function (request, response) {
        if (request.session.authenticated) {
            //console.log(request.body);
            request.body.dateAdded = new Date();
            request.body.owner = request.session.user.username;
            db.insert(request.body);
            response.setHeader('ContentType', 'application/json');
            response.send({});
        } else {
            response.status(401);
            response.send();
        }
    });

    //edits a book
    app.post("/api/book/:id", function (request, response) {
        if (request.session.authenticated) {
            response.setHeader('ContentType', 'application/json');
            response.send({});
        } else {
            response.status(401);
            response.send();
        }
    });

    //delete a book
    app.delete("/api/book/:id", function (request, response) {
        if (request.session.authenticated) {
            console.log('id = ' + request.params.id);
            db.remove({_id : request.params.id});
            response.setHeader('ContentType', 'application/json');
            response.send();
        } else {
            response.status(401);
            response.send();
        }
    });    
}

