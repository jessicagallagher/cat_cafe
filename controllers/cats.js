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

module.exports = cats;
