//require bcrypt, models && express
var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

//================================================================
//User controller.js files

router.get('/new', function(req, res) {
	res.render('users/new');
})

router.get('sign-in/users', function(req, res){
	res.render('users/sign-in');
})

router.get('sign-out', function(req, res){
	req.session.destroy(function(err){
		res.redirect('/')
	})
});


