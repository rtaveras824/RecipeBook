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
	}).then(function(profile_user) {
		console.log(profile_user);
		if(profile_user == null) {
			res.redirect('/user/sign-in');
		}

		bcrypt.compare(req.body.password, profile_user.passcode, function(err, result) {
			if(result == true) {
				req.session.logged_in = true;
				req.session.username = profile_user.username;
				req.session.user_id = profile_user.id;
				req.session.user_email = profile_user.email;
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
		attributes: ['id', 'username', 'email', 'description', 'image'],
		where: {
			id: id
		}
	}).then(function(profile_user) {
		console.log(profile_user);
		User = profile_user;
		if(req.session.user_id == profile_user.id) {
			console.log('This is the owner');

			res.render('user_profile', { 
				user_id: req.session.user_id,
				user_id_match: true, 
				user: profile_user 
			});

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
					res.render('user_profile', { 
						user_id: req.session.user_id,
						user_id_match: false, 
						user: profile_user, 
						following: isFollowing });
				});
			});
		}
	});
});

router.get('/:id/followers', function(req ,res) {
	var id = req.params.id;

	models.Users.findOne({
		where: {
			id: id
		}
	}).then(function(profile_user) {
		profile_user.getFollower({
			attributes: ['username']
		}).then(function(followers) {
			res.render('user_followers', { 
				user_id: req.session.user_id,
				followers: followers 
			});
		})
	})
});

router.get('/:id/favorites', function(req, res) {
	var id = req.params.id;

	models.Users.findOne({
		where: {
			id: id
		}
	}).then(function(user) {
		user.getFavoriteRecipes().then(function(recipes) {
			res.render('user_favorites', {
				user_id: req.session.user_id,
				recipes: recipes
			})
		})
	})
})

router.get('/:id/edit-profile', function(req ,res) {
	var id = req.params.id;

	models.Users.findOne({
		where: {
			id: id
		}
	}).then(function(profile_user) {
		res.render('user_profile_edit', { 
			user_id: req.session.user_id,
			user: profile_user 
		});
	})
});

router.put('/:id/update', function(req, res) {
	var id = req.params.id;

	var description = req.body.description;
	var email = req.body.email;
	var image = req.body.image;

	models.Users.update({
		description: description,
		email: email,
		image: image
	}, {
		where: {
			id: id
		}
	}).then(function() {
		res.redirect('/user/' + id);
	});
});

router.get('/:id/recipes', function(req ,res) {
	var id = req.params.id;
	var match = (id == req.session.user_id)
	var private;
	if (req.session.user_id != id) {
		private = false;
		var whereObject = {
			UserId: id,
			price: {
				$eq: 0.00
			},
			private: private
		};
	} else {
		var whereObject = {
			UserId: id,
			price: {
				$eq: 0.00
			}
		}
	}

	models.Recipe.findAll({
		where: whereObject
	}).then(function(recipes) {
		console.log(recipes);
		res.render('user_recipes', { 
			usermatch: match,
			user_id: req.session.user_id,
			recipes: recipes 
		});
	});
});


router.get('/:id/recipebook', function(req ,res) {
	var id = req.params.id;
	var private;
	console.log(id);

	var match = (id == req.session.user_id)

	models.RecipeBook.findAll({where:{UserId: id}})
	.then(function(books){
		
		console.log(books)
		res.render('user_recipebook', 
			{
				usermatch: match,
				recipebook: books, 
				user_id: req.session.user_id
			})

	})
	
});

router.get('/:id/recipes-for-sale', function(req ,res) {
	var id = req.params.id;

	models.Recipe.findAll({
		where: {
			UserId: id,
			price: {
				$not: 0.00
			}
		}
	}).then(function(recipes) {
		models.Users.findOne({
			where: {
				id: req.session.user_id
			}
		}).then(function(user) {
			user.getPaidRecipes().then(function(paid_recipes) {
				console.log('user paid recipes', paid_recipes);
				
				var paid = [];
				for(var i = 0; i < recipes.length; i++) {
					for(var j = 0; j < paid_recipes.length; j++) {
						if (recipes[i].dataValues.id == paid_recipes[j].dataValues.id) {
							recipes[i].dataValues.paid = true;
						}
					}
				}
				console.log(recipes);
				console.log('THIS IS PAID', paid);
				res.render('user_recipes', {
					user_id: req.session.user_id, 
					recipes: recipes
				});
			})
		})
		
	});
});

router.get('/:id/paid-recipes', function(req, res) {
	models.Users.findOne({
		where: {
			id: req.session.user_id
		}
	}).then(function(user) {
		user.getPaidRecipes().then(function(paid_recipes) {
			console.log(paid_recipes);
			res.render('user_recipes', { 
				user_id: req.session.user_id,
				recipes: paid_recipes 
			});
		})
	})
})



router.post('/:id/follow', function(req ,res) {
	var id = req.params.id;
	console.log(id);

	models.Users.findOne({
		where: {
			id: req.session.user_id
		}
	}).then(function(profile_user) {
		User.addFollower(profile_user).then(function() {
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
	}).then(function(profile_user) {
		User.removeFollower(profile_user).then(function() {
			res.redirect('/user/' + id);
		});
		
	});
});

module.exports = router;


