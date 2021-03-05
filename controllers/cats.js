// dependencies
const express = require('express');
const cats = express.Router();
const { isAuthenticated } = require('../services/middleware.js');

// models
const Cat = require('../models/catschema.js');
const User = require('../models/users.js');

/*~~~~~ routes ~~~~~*/

// index => render 3 different views depending on log in status and user type
cats.get('/', (req, res) => {
	Cat.find({}, (err, allCats) => {
		if(req.session.currentUser) {
			if(req.session.currentUser.userType === "Volunteer") {
				res.render('cats/index.ejs', {
					tabTitle: 'Home',
					cats: allCats
				});
			} else if(req.session.currentUser.userType === "Visitor") {
				res.render('cats/visitor_index.ejs', {
					tabTitle: 'Home',
					cats: allCats
				});
			};
		} else {
			res.render('cats/unauth_index.ejs', {
				tabTitle: 'Home',
				cats: allCats
			});
		};
	});
});

// new => add a cat
cats.get('/new', (req, res) => {
	res.render('cats/new.ejs', {
		tabTitle: 'Add a Cat'
	});
});

// create => push to db
cats.post('/', (req, res) => {
	Cat.create(req.body, (err, createdCat) => {
		res.render('cats/show.ejs', {
			tabTitle: createdCat.name,
			cats: createdCat
		});
	});
});

// show => render 3 different views depending on log in status and user type
cats.get('/:id', (req, res) => {
	Cat.findById(req.params.id, (err, foundCat) => {
		if(req.session.currentUser) {
			if(req.session.currentUser.userType === "Volunteer") {
				res.render('cats/show.ejs', {
					tabTitle: foundCat.name,
					cats: foundCat
				});
			} else if(req.session.currentUser.userType === "Visitor") {
				res.render('cats/visitor_show.ejs', {
					tabTitle: foundCat.name,
					cats: foundCat
				});
			};
		} else {
			res.render('cats/unauth_show.ejs', {
				tabTitle: foundCat.name,
				cats: foundCat
			});
		};
	});
});

// edit => edit a cat
cats.get('/:id/edit', (req, res) => {
	Cat.findById(req.params.id, (err, foundCat) => {
		res.render('cats/edit.ejs', {
			tabTitle: foundCat.name,
			cats: foundCat
		});
	});
});

// update => push edit to db
cats.put('/:id', (req, res) => {
	Cat.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCat) => {
		res.render('cats/show.ejs', {
			tabTitle: updatedCat.name,
			cats: updatedCat
		});
	});
});

// delete => delete a cat
cats.delete('/:id', (req, res) => {
	Cat.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, deletedCat) => {
		res.redirect('/cats');
	});
});

module.exports = cats;
