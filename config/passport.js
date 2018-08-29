var jwtStrategy = require("passport-jwt").Strategy;
var extractJwt = require("passport-jwt").ExtractJwt;
var mongoose = require("mongoose");
var User = mongoose.model("users");
var keys = require("../config/keys");

var opts = {};
opts.jwtStrategy = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err = console.log(err)));
    })
  );
};
