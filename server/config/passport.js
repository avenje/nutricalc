const passport = require('passport'),
      user = require('../models/user'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

// setting up local login
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {  
   User.findOne({ email: email }, function(err, user) {
     if(err) { return done(err); }
     if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
 
     user.comparePassword(password, function(err, isMatch) {
       if (err) { return done(err); }
       if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }
 
       return done(null, user);
     });
   });
 });

 const jwtOptions = {  
   // telling Passport to check authorization headers for JWT
   jwtFromRequest: ExtractJwt.fromAuthHeader(),
   // telling Passport where to find the secret
   secretOrKey: config.secret
 };

// setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  
   User.findById(payload._id, function(err, user) {
     if (err) { return done(err, false); }
 
     if (user) {
       done(null, user);
     } else {
       done(null, false);
     }
   });
 });

console.log(payload);

passport.use(jwtLogin);  
passport.use(localLogin);

