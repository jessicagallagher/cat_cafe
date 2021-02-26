// dependencies
const express = require('express');
const cats = express.Router();

// models
const Cat = require('../models/catschema.js');

/*~~~~~ routes ~~~~~*/

// index
cats.get('/', (req, res) => {
	res.render('cats/index.ejs');
});

module.exports = cats;
