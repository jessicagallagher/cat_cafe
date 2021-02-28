// dependencies
const express = require('express');
const cats = express.Router();

// models
const Cat = require('../models/catschema.js');

/*~~~~~ routes ~~~~~*/

// index
cats.get('/', (req, res) => {
	res.render('index.ejs', {
		tabTitle: 'Home'
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

module.exports = cats;
