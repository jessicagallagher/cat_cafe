const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	img: { type: String, required: true },
	intakeDate: { type: Date, required: true }
}, { timestamps: true });

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
