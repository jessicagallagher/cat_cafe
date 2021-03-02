// dependencies
const express = require('express');
const cat = express.Router();

// models
const Cat = require('../models/catschema.js');

/*~~~~~ routes ~~~~~*/

// index
cat.get('/', (req, res) => {
	Cat.find({}, (error, allCats) => {
		res.render('unauth/index.ejs', {
			tabTitle: 'Home',
			cats: allCats
		});
	});
});

module.exports = cat;
