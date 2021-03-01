// dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;

// app config
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// controller
const catController = require('./controllers/cats.js');

/*~~~~~ database ~~~~~*/

// connect through heroku / local
const MONGODB_URI = process.env.MONGODB_URI;

// connect to mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// connection sanity checks
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open connection to mongo
db.on('open', () => {});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// register controller routes
app.use('/cats', catController);

// listener
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
