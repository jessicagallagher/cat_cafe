const logRequest = (req, res, next) => {
	console.log(`${new Date().toISOString()} :: ${req.method} ${req.originalURL}`);
	next();
};

const isAuthenticated = (req, res, next) => {
	if(req.session.currentUser) {
		next();
	} else {
		console.log('Unauthenticated request');
		res.render('sessions/new.ejs');
	};
};

module.exports = {
	isAuthenticated,
	logRequest
};
