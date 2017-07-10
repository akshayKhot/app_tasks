const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/tasks/:date', (req, res) => {
    console.log(typeof req.params.date);
})



app.listen(3000, () => {
    console.log('Listening on port 3000')
})