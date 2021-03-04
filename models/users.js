const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	email: { type: String, required: true },
	username: String,
	password: { type: String, required: true },
	userType: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
