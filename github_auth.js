"use strict"

const passport = require('koa-passport'),
GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: '32c81517fb4b3d3e0df3',
    clientSecret: '7cc85ff6663b45603d4e9785ebd5cf4828abd9aa',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //Based on profile return from Github, find existing user
    let user = profile;

    //Return user model
    return done(null, user);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;