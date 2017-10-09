const express = require('express');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session   = require('express-session');
const _ = require('lodash');
const config = require('./server/config/db');
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//passport middleware


mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('connected to database: ' + config.database);  
});

mongoose.connection.on('error', (err) => {
  console.log('Error: ' + err);
});

const app = express();
const port = 4000;

  app.use(passport.initialize());
  app.use(passport.session());




// app.options('*', cors()); // include before other routes
// app.options('/api/*', cors());
// app.use(session({
//     secret: 'some secret',
//     resave: false,
//     saveUninitialized: true
// }));

app.use(express.static(__dirname + 'src'));

//router middleware
const users = require('./server/routes/index');

//bodyparser middleware




require('./server/config/passport')(passport);

///--------------------Strategy--------------////
// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: '32c81517fb4b3d3e0df3',
  clientSecret: '7cc85ff6663b45603d4e9785ebd5cf4828abd9aa',
  callbackURL: "http://localhost/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}
));

passport.use(new GoogleStrategy({
  clientID: "810580040492-2eevn86bpu5t2eha62nm9j7e0n354hmk.apps.googleusercontent.com",
  clientSecret: "lTNZ52z0uY_Q6IfdYGVpv8cg",
  callbackURL: "http://localhost/auth/google/callback",
  passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
 
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

///--------------------Route--------------////

app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/search');
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }
));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/search');
  });


// app.use('/api', users);

app.listen(port, ()=>{
  console.log('Server started listen on port: ' + port);
});