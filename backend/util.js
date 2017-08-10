var passport = require('passport');

function authenticate() {
    return (req, res, next) => {
        
        passport.authenticate('local', function(err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(403).json({
                    message: "failed"
                });
            }
            req.login(user, function(err) {
                if (err) 
                    return next(err);
                else
                    return next();
            });

        })(req, res, next);
  }
}

exports.authenticate = authenticate;