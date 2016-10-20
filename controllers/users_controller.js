//require models, express && bcrypt
var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

//=============================================================
//this is the users_controller.js file
//creates a new user
router.get('/new', function(req, res) {
	res.render('users/new');
});
//lets the user sign-in to the account
router.get('/sign-in', function(req, res) {
	res.render('users/sign-in');
});
//lets the user log-out the account
router.get('sign-out', function(req, res){
	req.session.destroy(function(err){
		res.redirect('/');
	})
});
//=============================================================
//login Part/ once the user created an account
router.post('login', function(req, res) {
	models.Users.findOne({
		where: {email: req.body.email}
	}).then(function(user){
		if (user == null){
			res.redirect('/users/sign-in')
		}

//comparing the users password with the hash bcrypt password if TRUE.
		bcrypt.compare(req.body.password, user.password_hash, function(req, res) {
			//if the password match and it's TRUE
			if(result == true){

			}
		})
	})
})

//=============================================================











