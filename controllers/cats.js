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

// edit
cats.get('/:id/edit', (req, res) => {
	Cat.findById(req.params.id, (err, foundCat) => {
		res.render('edit.ejs', {
			tabTitle: foundCat.name,
			cats: foundCat
		});
	});
});

// update
cats.put('/:id', (req, res) => {
	Cat.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCat) => {
		res.render('show.ejs', {
			tabTitle: updatedCat.name,
			cats: updatedCat
		});
	});
});

// delete
cats.delete('/:id', (req, res) => {
	Cat.findByIdAndRemove(req.params.id, (err, deletedCat) => {
		res.redirect('/cats');
	});
});

module.exports = cats;
