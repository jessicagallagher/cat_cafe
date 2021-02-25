// dependencies
const express = require('express');
const router = express.Router();

// models
const Cat = require('../models/catschema.js');

/*~~~~~ routes ~~~~~*/

// index
router.get('/', (req, res) => {
	res.send('hello i work!');
});

module.exports = router;
