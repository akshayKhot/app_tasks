var express           = require('express'),
    db                = require('./db'),
    _                 = require('lodash'),
    util              = require('util'),
    bcrypt            = require('bcrypt'),
    util              = require('./util');
  
const router  = express.Router();

router.get("/tasks", function(req, res) {
    db.query("select * from tasks")
        .then(db_tasks => {
            res.json(db_tasks);
        });
});

router.post('/tasks', (req, res) => {
    var task = req.body.task;
    var deadline = req.body.deadline;
    var query = `INSERT INTO tasks (task, deadline, username) VALUES ('${task}', '${deadline}', 'akshay03')`;
    
    db.query(query);
    res.end();
})

module.exports = router;