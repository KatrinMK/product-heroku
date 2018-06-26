const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const passport = require('passport');
const userFacebook = require('./facebook');
const userGoogle = require('./google');
// const Social = require('../models/socialUser')

userFacebook();
userGoogle();

const User = require('../models/user');


router.post('/signup', function (req, res, next) {

    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user){
                res.status(200).json({
                    message: "there is a user already this email"
                })
            }
            else {
                if(req.body.password){
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash,
                                name: req.body.name,
                                age: req.body.age,
                                telephone: req.body.telephone
                            })
                            return user.save();
                        })
                        .then(() => {
                            res.status(201).json({
                                message: 'user created succefull',
                            })
                        })
                        .catch(err =>{
                            res.status(500).json('hgfjhgf')
                        })
                    } else {
                        return res.status(404).json({
                            message: 'no password field'
                        })
                    }
            }
        })
 
})

router.get('/login/facebook', passport.authenticate('facebook', {scope: 'profile'}));
router.get('/login/facebook/callback',  (req, res) => {res.send("you are welcome at Facebook!!!")})

router.get('/login/google', passport.authenticate('google', {scope: 'profile'}));
router.get('/login/google/callback',  (req, res) => {res.redirect("http://localhost:3080/products")})

router.get('/', function(req, res, next){
    User
        .find()
        .select('-password')
        .exec()
        .then(users =>{
            res.status(200).json({
                message: 'all users',
                allUsers: users
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

router.post('/login', function(req, res, next) {
    User
        .findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user) {
                bcrypt
                    .compare(req.body.password, user.password, function(err, result) {
                        if(err){
                            result.status(500).json({
                                message: "wrong password"
                            })
                        } else {
                            const token = jsonwebtoken.sign({email: user.email, _id: user._id}, "secrets")
                            res.status(200).json({
                                message: 'Congratulation! login right',
                                userToken: token
                            })
                        }
                    });
            } else {
                res.status(404).json({
                    message: "user undefined"
                })
            }
        })
})

module.exports = router