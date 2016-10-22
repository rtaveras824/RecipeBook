//require models and express
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function (req, res){
	res.render('index', { 
		title: 'Main',
		ogtitle: 'GET BACK TO WORK'
	});
});

module.exports = router;