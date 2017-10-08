const express   = require('express'),
router    = express.Router(),
passport  = require('passport'),
jwt       = require('jsonwebtoken'),
_         = require('lodash'),
validator = require('validator'),
rp        = require('request-promise'),
config    = require('../config/db'),
cors      = require('cors'),
{User}    = require('../models/user'),
path      = require('path');



router.post('/search', (async (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.body.city);

    let city =  req.body.city;

    const apiKey = '79db9599e21f6fa00d36539b86173cd3';
    
    var options = {
      
    uri: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=7b359dd1309d346d33a02be668584fd3`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  }
 
 res.body = await rp(options)
    .then(function(city) {
          // console.log(city.list);
   return city.list;
})
    .catch(function (err) {
        throw(err);
    });

    console.log(res.body[0]);
}));

router.post('/register', (req, res) => {

  let body = _.pick(req.body, ['email', 'password', 'username']);
  let newUser = new User({local : body});
  if (!body.email || !body.password || !body.username) {
    res.status(400).json({success: false, message: 'Please fill in all fields'});
  } else {
    if (!validator.isEmail(body.email)) {
      res.status(400).json({success: false, message: body.email +' is not a valid e-mail'});
    } else {
      User.getUserByEmail(body.email, (err, user)=>{
        if (user) {
          res.status(409).json({success: false, message: 'Such e-mail already exist'});
        } else {
          newUser.save().then(() => {
            res.status(200).json({success: true, message: 'User successfully registered'});
          }).catch((e) => {
            res.status(400).json({success: false, message: 'Failed to register', error: e.message});
          });
        }
      });
    }

  }
});

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.getUserByEmail(email, (err, user) => {

    if (err) {return next(err);}

    if (!user) {
      res.status(404).json({success: false, message: 'E-mail: '+ email +' does not exist'});
    } else {
      User.comparePassword(password, user.local.password, (err, isMatch) => {
        if (err) {return next(err);}
        if (isMatch) {
          User.findOneAndUpdate({"local.email": email}, { $set: { online: true }}, (err, user) => {
            if (err) {
              return res.status(500).json({success: false, message: 'Server error'});
            } else {
              const token = jwt.sign(user, config.secret, {expiresIn: 604800});
              res.json({ success: true, message : 'Successfully logged in', token : 'JWT ' + token});
            }
          });
        } else {
          res.status(400).json({success: false, message: 'Wrong password'});
        }
      });
    }
  });
});

router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findOneAndUpdate({_id : req.user._id}, { $set: { online: false }}, (err, user) =>{
    if (err) {
      res.status(500).json({success: false, message: 'Server error'});
    } else {
      res.status(200).json({success: true, message: 'You are now logged out'});
    }
  });
});

router.get('/auth/facebook', cors(), passport.authenticate('facebook', {scope : ['email']}));

router.get('/auth/facebook/callback',  passport.authenticate('facebook', {session: false}), (req, res) => {
  const token = jwt.sign(req.user, config.secret, {expiresIn: 604800});
  res.header('Authorization', 'JWT ' + token).redirect('/');
});

router.get('/auth/google',cors() ,passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', cors() ,  passport.authenticate('google', {session: false}), (req, res) => {
  const token = jwt.sign(req.user, config.secret, {expiresIn: 604800});
  res.header('Authorization', 'JWT ' + token).redirect('/search');
});


router.get('/connect/facebook', passport.authenticate('jwt', {session: false}), passport.authorize('facebook', {scope : ['email']}));

router.get('/connect/google', passport.authenticate('jwt', {session: false}), passport.authorize('google', {scope: ['profile', 'email']}));

module.exports = router;