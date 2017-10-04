const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport       = require('koa-passport');
passport.use(new GoogleStrategy({
    clientID:     '810580040492-2eevn86bpu5t2eha62nm9j7e0n354hmk.apps.googleusercontent.com',
    clientSecret: 'lTNZ52z0uY_Q6IfdYGVpv8cg',
    callbackURL: "https://a5d41477.ngrok.io/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;