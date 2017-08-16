
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session');


module.exports = function(app) {

    app.use(session({ 
        secret: 'keyboard cat',
        resave: false, 
        saveUninitialized: false
    })); 
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function(username, password, done) {

            db.one(`select * from tasks where username='${username}'`)
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (user.password !== password) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                }); 
        }
    ));

    passport.serializeUser(function(user, done) {
        console.log("Serializing User");
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(username, done) {
        console.log(username);
        db.one(`select * from tasks where username='${username}'`)
            .then(user => done(null, user));
    });
}