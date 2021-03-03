// dependencies
const express = require('express');
const cats = express.Router();
const { isAuthenticated } = require('../services/middleware.js');

// models
const Cat = require('../models/catschema.js');

// middleware for authentication on each route in this controller
// cats.use(isAuthenticated);

/*~~~~~ routes ~~~~~*/

// index
// cats.get('/', (req, res) => {
// 	Cat.find({}, (error, allCats) => {
// 		res.render('cats/index.ejs', {
// 			tabTitle: 'Home',
// 			cats: allCats
// 		});
// 	});
// });

cats.get('/', (req, res) => {
	Cat.find({}, (err, allCats) => {
		if(req.session.currentUser) {
			res.render('cats/index.ejs', {
				tabTitle: 'Home',
				cats: allCats
			});
		} else {
			res.render('cats/unauth_index.ejs', {
				tabTitle: 'Home',
				cats: allCats
			});
		};
	});
});

// new
cats.get('/new', (req, res) => {
	res.render('cats/new.ejs', {
		tabTitle: 'Add a Cat'
	});
});

// create
cats.post('/', (req, res) => {
	Cat.create(req.body, (err, createdCat) => {
		res.render('cats/show.ejs', {
			tabTitle: createdCat.name,
			cats: createdCat
		});
	});
});

// show
// cats.get('/:id', (req, res) => {
// 	Cat.findById(req.params.id, (err, foundCat) => {
// 		res.render('cats/show.ejs', {
// 			tabTitle: foundCat.name,
// 			cats: foundCat
// 		});
// 	});
// });

cats.get('/:id', (req, res) => {
	Cat.findById(req.params.id, (err, foundCat) => {
		if(req.session.currentUser) {
			res.render('cats/show.ejs', {
				tabTitle: foundCat.name,
				cats: foundCat
			})
		} else {
			res.render('cats/unauth_show.ejs', {
				tabTitle: foundCat.name,
				cats: foundCat
			});
		};
	});
});

// edit
cats.get('/:id/edit', (req, res) => {
	Cat.findById(req.params.id, (err, foundCat) => {
		res.render('cats/edit.ejs', {
			tabTitle: foundCat.name,
			cats: foundCat
		});
	});
});

// update
cats.put('/:id', (req, res) => {
	Cat.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCat) => {
		res.render('cats/show.ejs', {
			tabTitle: updatedCat.name,
			cats: updatedCat
		});
	});
});

// delete
cats.delete('/:id', (req, res) => {
	Cat.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, deletedCat) => {
		res.redirect('/cats');
	});
});

module.exports = cats;
