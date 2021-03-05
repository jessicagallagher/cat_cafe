// dependencies
const express = require('express');
const adopt = express.Router();
const { isAuthenticated } = require('../services/middleware.js');

// models
const Adopt = require('../models/adoption.js');
const User = require('../models/users.js');

/*~~~~~ routes ~~~~~*/

// new
adopt.get('/new', (req, res) => {
	if(req.session.currentUser) {
		res.render('cats/adoption.ejs', {
			tabTitle: 'Adoption Form'
		});
	} else {
		res.render('cats/unauth_adoption.ejs', {
			tabTitle: 'Paw-don Me'
		});
	};
});

adopt.get('/confirm', (req, res) => {
	res.render('cats/visitor_adopt_confirm.ejs', {
		tabTitle: 'Purr-fect!'
	});
});;

// create
adopt.post('/', (req, res) => {
	Adopt.create(req.body, (err, createdAdoption) => {
		res.redirect('/adopt/confirm')
	});
});

module.exports = adopt;
