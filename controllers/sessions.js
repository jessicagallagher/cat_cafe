// dependencies
const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcryptjs');

// models
const User = require('../models/users.js');

/*~~~~~ routes ~~~~~*/

// new
sessions.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {
		currentUser: req.session.currentUser,
		tabTitle: 'Log In'
	});
});

// create
sessions.post('/', (req, res) => {
	User.findOne({ username: req.body.username }, (err, foundUser) => {
		// db error
		if(err) {
			console.log(err);
			res.send('Oops! The database hissed at us. Try again when it calms down!');
		} else if(!foundUser) {
			// if found user is undefined / null / not found, etc.
			res.send('<a href="sessions/new">Sorry, we couldn\'t find you! Are you sure that you typed in your login credentials purr-fectly? </a>');
		} else {
			if(bcrypt.compareSync(req.body.password, foundUser.password)) {
				// We have a matching password
				req.session.currentUser = foundUser;
				res.redirect('/cats');
			} else {
				// passwords don't match
				res.send('<a href="/">Oops! It looks like that\'s the wrong password! Make sure you type in your password purr-fectly! </a>');
			};
		};
	});
});


// logout
sessions.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/sessions/new');
	});
});

module.exports = sessions;
