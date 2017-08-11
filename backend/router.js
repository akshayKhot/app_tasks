var express           = require('express'),
    db                = require('./db'),
    _                 = require('lodash'),
    util              = require('util'),
    bcrypt            = require('bcrypt'),
    util              = require('./util');
  
const router  = express.Router();


router.get("/tasks", function(req, res) {
    console.log(req.isAuthenticated());
    db.query("select * from tasks")
        .then(db_tasks => {
            res.json(db_tasks);
        });
})

router.post("/user/new", function(req, res) {

    validateData(req);
    
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.json({ 'status': "Error" });
            return;
        } else {
            const saltRounds = 10;

            var name = req.body.name;
            var username = req.body.username;
            var email = req.body.email;
            var password = req.body.password;

            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hashedPassword) {
                    var query = `INSERT INTO users (name, username, email, password) VALUES ('${name}', '${username}', '${email}', '${hashedPassword}')`;

                    db.query(query).then(() => {
                        res.json({
                            'status': "Success",
                            'username': req.user,
                            'isAuthenticated': req.isAuthenticated()
                        }); 
                    });
                });
            });
        }
    });

});

function validateData(req) {
    // validations!
    req.checkBody('name', 'Name can not be empty').notEmpty();
    req.checkBody('username', 'Username can not be empty').notEmpty();
    req.checkBody('email', 'Email can not be empty').notEmpty();
    req.checkBody('password', 'Password can not be empty').notEmpty();

    req.checkBody('username', "Username must be 4-15 characters long").len(4, 15);
    req.assert('email', 'valid email required').isEmail();
    
}

router.post('/tasks', (req, res) => {
    var task = req.body.task;
    var deadline = req.body.deadline;
    var date = "03082017";
    var query = `INSERT INTO tasks (task, deadline, date, completed) VALUES ('${task}', '${deadline}', '${date}', false)`;
    
    db.query(query);
    res.end();
})

module.exports = router;