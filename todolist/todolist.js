var bodyParser = require('body-parser');
var Database = require('nedb');

var db = new Database({ filename: __dirname + '/tasks.nedb', autoload: true });

exports.addRoutes = function (app) {
    app.use(bodyParser.json());

    //get all the tasks
    app.get("/api/task", function (request, response) {
        db.find({}, function (err, tasks) {
            response.setHeader('ContentType', 'application/json');
            response.send(tasks);
        });
    });

    //get a task
    app.get("/api/task/:id", function (request, response) {
        response.setHeader('ContentType', 'application/json');
        response.send({});
    });

    //add a task
    app.post("/api/task", function (request, response) {
        if (request.session.authenticated) {
            //console.log(request.body);
            request.body.dateAdded = new Date();
            db.insert(request.body);
            response.setHeader('ContentType', 'application/json');
            response.send({});
        } else {
            response.status(401);
            response.send();
        }
    });

    //edits a task
    app.post("/api/task/:id", function (request, response) {
        if (request.session.authenticated) {
            response.setHeader('ContentType', 'application/json');
            response.send({});
        } else {
            response.status(401);
            response.send();
        }
    });

    //delete a task
    app.delete("/api/task/:id", function (request, response) {
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
