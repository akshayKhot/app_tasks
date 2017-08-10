var express             = require('express'),
    bp                  = require('body-parser'),
    apiRouter           = require('./backend/router'),
    expressValidator    = require('express-validator'),
    cookieParser        = require('cookie-parser'),
    session             = require('express-session'),
    db                  = require('./backend/db'),
    bcrypt              = require('bcrypt'),
    pgSession           = require('connect-pg-simple')(session),
    passport            = require('passport'),
    LocalStrategy       = require('passport-local').Strategy,
    bcrypt              = require('bcrypt')
    util                = require('./backend/util');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", ["PUT", "DELETE"]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(bp.json());
app.use(bp.urlencoded({ extended: false })) 
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

passport.use(new LocalStrategy(function(username, password, done) {
    db.one(`SELECT * FROM users WHERE username = '${username}'`)
        .then(user => {
            if(!user) {
                return done(null, false, { message: 'Incorrect username' });
            } 

            bcrypt.compare(password, user.password, function(err, res) {
                if(res)
                    return done(null, user);
                else
                    return done(null, false, { message: 'Incorrect password' })
            });
            
        })
        .catch(err => console.log(err));
}));


app.use(express.static('wwwroot'));
app.use("/api", apiRouter);


app.post('/login', util.authenticate(), function(req, res) {
    return res.json({ message: 'success' });
});

app.get('/logout', function(req, res) {
    req.logout();
    res.json({"message": "logged out successfully"});
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});



