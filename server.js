const express = require('express')
const app = express()
var _ = require('lodash')
var pgp = require('pg-promise')()
var bp = require('body-parser')
var request = require('request')

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

var friends = ["Akshay", "Amey", "Mangesh", "Bandya"];

app.get("/api/tasks", function(req, res) {
    db.query("select * from tasks")
        .then(db_tasks => {
            res.json(db_tasks);
        });
})

app.post("/api/post", function(req, res) {
    console.log("received post");
    res.end();
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