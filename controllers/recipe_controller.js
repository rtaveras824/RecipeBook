//require models and express
var models  = require('../models');
var express = require('express');
var router  = express.Router();

//redirect the URL

router.get('/', function (req, res){
	models.Recipe.findAll({
		include : [models.User] 
	})

})