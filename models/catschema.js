const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
	name: { type: String, required: true },
	ageYears: { type: Number, required: true },
	ageMonths: { type: Number, required: true },
	description: { type: String, required: true },
	img: { type: String, required: true }
}, { timestamps: true });

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
