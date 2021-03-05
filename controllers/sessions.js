// dependencies
const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcryptjs');

// models
const User = require('../models/users.js');

/*~~~~~ routes ~~~~~*/

// new => log in to begin session
sessions.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {
		currentUser: req.session.currentUser,
		tabTitle: 'Log In'
	});
});

// create => conditionals for session creation
sessions.post('/', (req, res) => {
	User.findOne({ username: req.body.username }, (err, foundUser) => {
		// db error
		if(err) {
			console.log(err);
			res.send('Oops! The database hissed at us. Try again when it calms down!');
		} else if(!foundUser) {
			// if found user is undefined / null / not found, etc.
			res.send('Sorry, we couldn\'t find you! Are you sure that you typed in your login credentials purr-fectly? <a href="sessions/new">Meow-ch! Try again!</a>');
		} else {
			if(bcrypt.compareSync(req.body.password, foundUser.password)) {
				// We have a matching password
				req.session.currentUser = foundUser;
				if(foundUser.userType === "Volunteer") {
					res.render('users/new_welcome.ejs', {
						tabTitle: 'Meowdy!',
						users: foundUser
					});
				} else {
					res.render('users/welcome_back.ejs', {
						tabTitle: 'Meowdy!',
						users: foundUser
					});
				};
			} else {
				// passwords don't match
				res.send('Oops! It looks like that\'s the wrong password! Make sure that you type in your password purr-fectly! <a href="sessions/new">Meow-ch! Try again!</a>');
			};
		};
	});
});


// logout => ends session
sessions.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/sessions/new');
	});
});

module.exports = sessions;
