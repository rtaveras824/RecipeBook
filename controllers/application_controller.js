//require models and express
var models  = require('../models'),
	path = require('path'),
	express = require('express'),
	router  = express.Router();

router.get('/', function (req, res){
	var button = '';
	if (req.session.user_id) {
		res.render('index', { 
			title: 'Main',
			ogtitle: 'GET BACK TO WORK'
		});
	} else {
		res.sendFile(path.join(__dirname + '/../public/landing-page.html'));
	}
});

module.exports = router;