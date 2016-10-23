//require bcrypt, models && express
var bcrypt = require('bcryptjs'),
	models  = require('../models'),
	path = require('path'),
	express = require('express'),
	router  = express.Router();

var User;


router.get('/sign-in', function(req, res){
	res.sendFile(path.join(__dirname + '/../public/sign-in.html'));
});

router.get('/sign-up', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/sign-up.html'));
})

router.get('/sign-out', function(req, res){
	req.session.destroy(function(err){
		res.redirect('/');
	});
});

router.post('/login', function(req, res) {
	models.Users.findOne({
		where: {
			username: req.body.username
		}
	}).then(function(user) {
		console.log(user);
		if(user == null) {
			res.redirect('/user/sign-in');
		}

		bcrypt.compare(req.body.password, user.passcode, function(err, result) {
			if(result == true) {
				req.session.logged_in = true;
				req.session.username = user.username;
				req.session.user_id = user.id;
				req.session.user_email = user.email;
				res.redirect('/');
			} else {
				res.redirect('/user/sign-in');
			}
		})
	});
});

router.post('/create', function(req, res) {
	models.Users.findOne({
		where: {
			email: req.body.email,
			username: req.body.username
		}
	}).then(function(users) {
		if(users != null) {
			res.redirect('/user/sign-up');
		} else {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					models.Users.create({
						email: req.body.email,
						username: req.body.username,
						passcode: hash
					}).then(function(user) {
						req.session.logged_in = true;
						req.session.username = user.username;
						req.session.user_id = user.id;
						req.session.user_email = user.email;
						res.redirect('/');
					});
				});
			})
		}
	});
});

router.get('/:id', function(req, res) {
	var id = req.params.id;
	var isFollowing;

	models.Users.findOne({
		attributes: ['id', 'username', 'email'],
		where: {
			id: id
		}
	}).then(function(user) {
		console.log(user);
		User = user;
		if(req.session.user_id == user.id) {
			console.log('This is the owner');
			res.render('user_profile', { user_id_match: true });
		} else {
			console.log('This is NOT the owner');
			models.Users.findOne({
				where: {
					id: req.session.user_id
				}
			}).then(function(client_user) {
				User.hasFollower(client_user).then(function(result) {
					isFollowing = result;
					console.log(isFollowing);
					res.render('user_profile', { user_id_match: false, following: isFollowing });
				});
			});
		}
	});
});

router.get('/:id/followers', function(req ,res) {
	res.end('Follwoers');
});

router.get('/:id/update', function(req ,res) {
	res.end('Update');
});

router.get('/:id/recipes', function(req ,res) {
	res.end('Recipes');
});

router.get('/:id/recipes-for-sale', function(req ,res) {
	res.end('For Sale');
});

router.post('/:id/follow', function(req ,res) {
	var id = req.params.id;
	console.log(id);

	models.Users.findOne({
		where: {
			id: req.session.user_id
		}
	}).then(function(user) {
		User.addFollower(user).then(function() {
			res.redirect('/user/' + id);
		});
	});
});

router.post('/:id/unfollow', function(req ,res) {
	var id = req.params.id;
	console.log(id);

	models.Users.findOne({
		where: {
			id: req.session.user_id
		}
	}).then(function(user) {
		User.removeFollower(user).then(function() {
			res.redirect('/user/' + id);
		});
		
	});
});

module.exports = router;











