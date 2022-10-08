const passport = require("passport");
//const { ExtractJwt } = require("passport-jwt");
const User = require("./models/user.model");
const Partner = require("./models/partner.model");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Random string";

passport.use(
  "partner",
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("Passport.js payload" + jwt_payload);
    Partner.findOne({ _id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.use(
  "korisnik",
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("Passport.js payload" + JSON.stringify(jwt_payload));

    User.findOne({ _id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
