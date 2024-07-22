const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

// route to sign-up
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

// route to sign-in
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
});
 
// destroy session and reroute after sign-out
router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// CREATE an account
router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username})
        
        // confirm availability of username
        if (userInDatabase) {
            return res.send('Username already taken')
        };

        // password is reentered correctly
        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and Confirm Password must match')
        };

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        await User.create(req.body);
        res.redirect('/auth/sign-in')
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// logging into account
router.post('/sign-in', async (req, res) => {
    try {
        
        // check for username
        const userInDatabase = await User.findOne({ username:req.body.username });
        if (!userInDatabase) {
            return res.send('Login failed. Please try again.');
        };

        // check password
        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password,
        );
        if (!validPassword) {
            return res.send('Login failed. Please try again.')
        };

        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id
        };

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

module.exports = router;