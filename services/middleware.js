const logRequest = (req, res, next) => {
	console.log(`${new Date().toISOString()} :: ${req.method} ${req.originalURL}`);
	next();
};

const isAuthenticated = (req, res, next) => {
	if(req.session.currentUser) {
		next();
	} else {
		console.log('Unauthenticated request');
		res.render('unauth/index.ejs', {
			tabTitle: 'Home'
		});
	};
};

module.exports = {
	isAuthenticated,
	logRequest
};
