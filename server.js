// dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;

// app config
const app = express();
const port = process.env.port || 3000;
// const databaseName = 'cat_cafe';

// controller
const catController = require('./controllers/cats.js');

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + `cat_cafe`;

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open', () => {});

// database config
// mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// mongoose.connection.once('open', () => {
// 	console.log('connected to mongo');
// });

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/cats', catController);

// listener
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
