// dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// app config
const app = express();
const port = 3000;
const databaseName = 'cat_cafe';

// controller
const catController = require('./controllers/cats.js');

// database config
mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/cats', catController);

// listener
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
