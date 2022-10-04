// users.js: Handles authentication with google

// Set up imports and get express-router
const express = require('express')
const passport = require('passport');
const router = express.Router();

// Create routes to index
// Will be localhost:3000 when you use just /
router.get('/', (req, res, next) => {
    // render our views to index.js file?
    res.render('index');
})

// Handle routing when authenticating with google
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/index');
  });

module.exports = router;

/*
const User = require('../model/personal/User');
//const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };*/