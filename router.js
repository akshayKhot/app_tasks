var express = require('express'),
    db      = require('./db.js').db;
    
const router  = express.Router();


router.get("/tasks", function(req, res) {
    db.query("select * from tasks")
        .then(db_tasks => {
            res.json(db_tasks);
        });
})

router.post("/user/new", function(req, res) {

    // validations!
    req.checkBody('name', 'Name can not be empty').notEmpty();
    req.checkBody('username', 'Username can not be empty').notEmpty();
    req.checkBody('email', 'Email can not be empty').notEmpty();
    req.checkBody('password', 'Password can not be empty').notEmpty();

    req.checkBody('username', "Username must be 4-15 characters long").len(4, 15);
    req.assert('email', 'valid email required').isEmail();
    
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.json({
                'status': "Error"
            });
            return;
        }
        const saltRounds = 10;
        const myPlaintextPassword = 's0/\/\P4$$w0rD';
        const someOtherPlaintextPassword = 'not_bacon';

        var name = req.body.name;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hashedPassword) {
            var query = `INSERT INTO users (name, username, email, password) VALUES ('${name}', '${username}', '${email}', '${hashedPassword}')`;

            db.query(query);
                res.json({
                    'status': "Success",
                    'name': req.body.name,
                    'username': req.body.username
                }); 
            });
    });
        
        
  });

})

router.post('/tasks', (req, res) => {
    var task = req.body.task;
    var deadline = req.body.deadline;
    var date = "03082017";
    var query = `INSERT INTO tasks (task, deadline, date, completed) VALUES ('${task}', '${deadline}', '${date}', false)`;
    
    db.query(query);
    res.end();
})

module.exports = router;