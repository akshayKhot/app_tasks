var express             = require('express'),
      _                 = require('lodash'),
      pgp               = require('pg-promise')(),
      bp                = require('body-parser'),
      request           = require('request'),
      expressValidator  = require('express-validator'),
      Strategy          = require('passport-local').Strategy;

var app = express();

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres'
}
var db = pgp(cn)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", ["PUT", "DELETE"]);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bp.json());
app.use(expressValidator());

app.get("/api/tasks", function(req, res) {
    db.query("select * from tasks")
        .then(db_tasks => {
            res.json(db_tasks);
        });
})

app.post("/api/user/new", function(req, res) {

    console.log("received post");
    req.checkBody('name', 'Name can not be empty').notEmpty();
    req.checkBody('username', 'Username can not be empty').notEmpty();
    req.checkBody('email', 'Email can not be empty').notEmpty();
    req.assert('email', 'valid email required').isEmail();
    req.checkBody('password', 'Password can not be empty').notEmpty();
    
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.json({
                'status': "Error"
            });
            return;
        }
        var name = req.body.name;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        
        var query = `INSERT INTO users (name, username, email, password) VALUES ('${name}', '${username}', '${email}', '${password}')`;

        db.query(query);
            res.json({
                'status': "Success",
                'name': req.body.name,
                'username': req.body.username
            });
  });

})

app.post('/api/tasks', (req, res) => {
    var task = req.body.task;
    var deadline = req.body.deadline;
    var date = "03082017";
    var query = `INSERT INTO tasks (task, deadline, date, completed) VALUES ('${task}', '${deadline}', '${date}', false)`;
    
    db.query(query);
    res.end();
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})