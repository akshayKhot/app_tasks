var express             = require('express'),
    bp                  = require('body-parser'),
    apiRouter           = require('./backend/router'),
    expressValidator    = require('express-validator');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", ["PUT", "DELETE"]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(bp.json());
app.use(expressValidator());
app.use(express.static('wwwroot'));
app.use("/api", apiRouter);

app.get("/", function(req, res) {
    res.sendFile("index.html");
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})