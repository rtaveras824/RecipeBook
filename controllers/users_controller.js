//require bcrypt, models && express
var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

//================================================================
//User controller.js files

router.get('/new', function(req, res) {
	res.render('users/new'); //handlebar call
})

router.get('sign-in/users', function(req, res){
	res.render('users/sign_in');//handlebar call
})

router.get('sign-out', function(req, res){
	req.session.destroy(function(err){ //handlebar call
		res.redirect('/')
	})
});
//================================================================
//login for users

router.post('/login', function(req, res) {
	models.Users.findOne({
		where:{email: req.body.email}
	}).then(function(user){ //here the user is an argument of the function.

		if(user === null){
			res.redirect('/users/sign-in');//handlebar call
		}
		//comparing the user password input with the stored.
		bcrypt.compare(req.body.password, user.password_hash, function(err, result){

			if(result == true){
				req.session.logged_in = true; //this will look inside the handlebar for the logged_in.
									   //user is the parameter of the function	
				req.session.username = user.username;  //username is in the handlebar files, and it' saved to the session.

				req.session.user_id = user.id; //

				req.session.user_email = user.email;

				res.redirect('/');//redirect to main page after the user is confirmed.

			}
			else{
				//if the password did not match redirect them to the users sign-in page.
				req.redirect('/users/sign-in');
			}
		})
	})
});

//================================================================
//creating a new user for the web page.

router.post('/create', function(req, res){
	models.Users.findAll({
		where:{email:req.body.email}
	}).then(function(users){ //users parameter of this function
		if(users.length > 0){
			console.log(users);
			res.send('There is already an account with that username or email'); //sending this message if the account already exist.
		} else{

			//hashing the users password
			//hash will take a clear text string and perform an algorithm on it; 
			//This value will be the same every time, so you can store the hashed password in a database and check the user's entered password against the hash.
			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(req.body.password, salt, function(err, hash){

					//using the models.user.js to create a new user.
					models.Users.create({
						email: req.body.email,
						passcode: hash
						//saving the req.session with the .then
					}).then(function(user){
						//all of these statements are saved into the session
						req.session.logged_in = true;
						req.session.username = user.username;
						req.session.user_id = user.id;
						req.session.user_email = user.email;

						// redirect to home on login
						res.redirect('/')

					})

				})
			})
		}
	})
});

module.exports = router;











