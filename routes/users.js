const express = require('express');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        err => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json({succes: true, status: 'Registration Succesful'});
                });
            }
        }
    );
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'appliction/json');
    res.json({success: true, status: 'Your are succesfully logged in'});
});

router.get('/logout', (req, res, next) => {
    if(req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        const error = new Error('You are not logged in');
        err.status = 401;
        return next(err);
    }
});

module.exports = router;
