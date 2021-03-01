// dependencies
const express = require('express');
const cats = express.Router();

// models
const Cat = require('../models/catschema.js');

/*~~~~~ routes ~~~~~*/

// index
cats.get('/', (req, res) => {
	Cat.find({}, (error, allCats) => {
		res.render('index.ejs', {
			tabTitle: 'Home',
			cats: allCats
		});
	});
});

// new
cats.get('/new', (req, res) => {
	res.render('new.ejs', {
		tabTitle: 'Add a Cat'
	});
});

// create
cats.post('/', (req, res) => {
	Cat.create(req.body, (err, createdCat) => {
		res.redirect('/cats');
	});
});

// show
cats.get('/:id', (req, res) => {
	Cat.findById(req.params.id, (err, foundCat) => {
		res.render('show.ejs', {
			tabTitle: foundCat.name,
			cats: foundCat
		});
	});
});

module.exports = cats;
