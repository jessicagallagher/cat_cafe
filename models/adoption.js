const mongoose = require('mongoose');

const adoptCat = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	age: { type: String, required: true },
	email: { type: String, required: true }
}, { timestamps: true });

const Adopt = mongoose.model('Adopt', adoptCat);

module.exports = Adopt;
