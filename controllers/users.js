// dependencies
const express = require('express');
const users = express.Router();
const bcrypt = require('bcryptjs');

// models
const User = require('../models/users.js');

/*~~~~~ routes ~~~~~*/

// new
users.get('/new', (req, res) => {
	res.render('users/new.ejs', {
		tabTitle: 'Create an Account'
	});
});

// create
users.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	console.log(req.body)
	User.create(req.body, (err, newUser) => {
		console.log('user is created: ', newUser);
		res.render('users/new_welcome.ejs', {
			tabTitle: 'Meowdy!',
			users: newUser
		});
	});
});

module.exports = users;
