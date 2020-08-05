const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys=require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},
//get user info and save it to database if we want
(accessToken, refreshToken, profile, done) => { 
  //initiate search for existing user
  User.findOne({ googleId: profile.id})
    .then((existingUser) => {
      if(existingUser){
        //we already have a record with the given profile ID
        done(null, existingUser);
      } else {
        //we don't have a user record with this ID, make a new record
        new User({ googleId: profile.id})
          .save()
          .then(user => done(null, user));
      }
    })
  
  }
  )
);


