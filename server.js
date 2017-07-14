const express = require('express')
const app = express()
var _ = require('lodash')
var pgp = require('pg-promise')()
var bp = require('body-parser')

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres'
}
var db = pgp(cn)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bp.json());

app.get('/', (req, res) => {
    res.send("index.html");
})

app.get('/api/tasks/:date', (req, res) => {
    db.query("select * from tasks")
    .then(db_tasks => {
        var date = req.params.date;
        var tasks_for_date = _.filter(db_tasks, task => task.date == date);
        res.json(tasks_for_date);
    })
    .catch(err => console.log(err));
})

app.post('/api/tasks', (req, res) => {
    var task = req.body.task;
    var deadline = req.body.deadline;
    var date = req.body.date;
    var query = `INSERT INTO tasks (task, deadline, date, completed) VALUES ('${task}', '${deadline}', '${date}', false)`;
    db.query(query);
    res.end();
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})