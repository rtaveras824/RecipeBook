//require models and express
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function (req, res){
	res.redirect('/home');
});

module.exports = router;