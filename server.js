var express             = require('express'),
    bp                  = require('body-parser'),
    apiRouter           = require('./backend/router'),
    expressValidator    = require('express-validator'),
    cookieParser        = require('cookie-parser'),
    session             = require('express-session'),
    db                  = require('./backend/db').db, 
    pgSession           = require('connect-pg-simple')(session),
    passport            = require('passport');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", ["PUT", "DELETE"]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(bp.json());
app.use(expressValidator());
app.use(cookieParser());

app.use(session({
  store: new pgSession({
    pgPromise : db
  }),
  secret: 'keyboard cat',
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days 
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(express.static('wwwroot'));
app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000')
})