const express = require('express')
const app = express()
var _ = require('lodash');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
})

var tasks = [{
    task: "Workout",
    deadline: "5.30 pm",
    date: "10072017"
}, {
    task: "Make Coffee",
    deadline: "6.30 pm",
    date: "10072017"
}, {
    task: "Go to bed",
    deadline: "10.30 pm",
    date: "09072017"
}, {
    task: "Wake up early",
    deadline: "6.30 am",
    date: "10072017"
}];

app.get('/api/tasks/:date', (req, res) => {
    console.log("Received call");
    var date = req.params.date;
    var tasks_for_date = _.filter(tasks, task => task.date == date);
    res.json(tasks_for_date);
})



app.listen(3000, () => {
    console.log('Listening on port 3000')
})