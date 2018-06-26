const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Social = require('../models/socialUser');
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

let userGoogle = () => {
    passport.use(new GoogleStrategy({
        clientID: '702661113263-qdo9qp1i0nfcod634e11kfpr3ik50b29',
        clientSecret: 'y6biAVpChoucYls-qhOCT1XI',
        callbackURL: "http://localhost:3080/user/login/google/callback"
    },
        (accessToken, refreshToken, profile, done) => {
            console.log('check profile', profile);
            let data = profile._json;

            Social.findOne({ id: data.id })
                .exec()
                .then(user => {
                    if (!user) {
                        const newUser = new Social({
                            id: data.id,
                            displayName: data.displayName,
                            provider: data.provider
                        });
                        newUser.save();
                        done(null, newUser);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    ));
};

module.exports = userGoogle;
