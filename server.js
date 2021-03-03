// dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;
const session = require('express-session');
const { logRequest } = require('./services/middleware.js');

// app config
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// controller
const catController = require('./controllers/cats.js');
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');

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

// middleware for form submissions
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false
	})
);
app.use(logRequest);
console.log(process.env.SECRET)

// middleware for heroku redirect
app.get('/', (req, res) => {
	res.redirect('/cats');
});

// register controller routes
app.use('/cats', catController);
app.use('/users', userController);
app.use('/sessions', sessionsController);

// listener
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
