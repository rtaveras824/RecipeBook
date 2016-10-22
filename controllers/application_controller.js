//require models and express
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function (req, res){
	var button = '';
	var user_id = req.session.user_id || null;
	if (req.session.user_id) {
		console.log("OKSDFJOSDFIJ");
	} else {
		console.log("Nope");
	}
	res.render('index', { 
		title: 'Main',
		ogtitle: 'GET BACK TO WORK'
	});
});

module.exports = router;