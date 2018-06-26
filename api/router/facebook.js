const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const router = express.Router();



const User = require('../models/user')

let userFacebook = () => passport.use(new FacebookStrategy({
    clientID: 269637450266979,
    clientSecret: '3ca6f8a5db1431803fd19997efdd2304',
    callbackURL: "http://localhost:3080/user/login/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {
      console.log('profile', profile);
      let data = profile._json();

      User.findOne({email: data.email})
          .exec()
          .then(user =>  {
              if(!user){
                  const user = new User({
                      _id: data.id,
                      email: data.email
                  }) 
              }
          })
          .catch()


    // User.findOrCreate(email, function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));
// router.get('/login/facebook/callback', userFacebook.authenicate('facebook'), (req, res) => {res.send("you are welcome at Facebook!!!")})

// 269637450266979
// 3ca6f8a5db1431803fd19997efdd2304

module.exports = userFacebook;
