var express             = require('express'),
    bp                  = require('body-parser'),
    apiRouter           = require('./backend/router'),
    db                  = require('./backend/db'),
    util                = require('./backend/util');

var app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", ["PUT", "DELETE"]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(bp.json());
app.use(bp.urlencoded({ extended: false })) 
app.use(express.static('wwwroot'));
app.use("/api", apiRouter);

app.get("/register", function(req, res) {
    res.render("register", {
        title: "Register",
        message: "You can sign up for the application here"
    })
});

app.get("/login", function(req, res) {
    res.render("login", {
        title: "Login",
        message: "You can log in for the application here"
    })
});


app.listen(3000, () => {
    console.log('Listening on port 3000')
});


