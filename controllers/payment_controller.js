var models  = require('../models'),
	path = require('path'),
	express = require('express'),
	router = express.Router(),
	braintree = require('braintree');

var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: 'hgtwqk4zznb8g2c7',
	publicKey: '9xpwtqj2dbmwg482',
	privateKey: 'f231c9c65307c908a23bcace1734851e'
});

router.get('/', function(req, res) {
	var recipe_id = req.query.recipe_id;

	models.Recipe.findOne({
		where: {
			id: recipe_id
		}
	}).then(function(recipe) {
		console.log('recipe', recipe);
		res.render('payment', { recipe: recipe });
	});
});

router.get('/client_token', function(req, res) {
	gateway.clientToken.generate({}, function(err, response) {
		console.log(response.clientToken);
		res.render('payment', { client_token: response.clientToken });
	});
});

router.post('/recipe/checkout', function(req, res) {
	// var nonceFromTheClient = req.body.payment_method_nonce;
	var id = req.session.user_id;

	var recipe_id = req.body.recipe_id;
	var price = req.body.price;

	gateway.customer.search(function(search) {
		search.id().is(id);
	}, function(err, response) {
		if(err) {
			console.log(err);
		}
		console.log("This is the response", response);

		if (response.ids.length > 0) {
			response.each(function(err, customer) {
				console.log("This is the customer", customer);
				transaction(id);
			});
		} else {
			gateway.customer.create({
				id: req.session.user_id,
				firstName: req.session.username,
				email: req.session.user_email
			}, function(err, result) {
				console.log(result);
				transaction(id);
			});
		}
	});
	
	function transaction(user_id) {
		gateway.transaction.sale({
			amount: price,
			paymentMethodNonce: 'fake-valid-nonce',
			customerId: user_id,
			options: {
				submitForSettlement: true
			}
		}, function(err, result) {
			if(err) {
				console.log(err);
				return;
			}
			console.log(result);
			models.Users.findOne({
				where: {
					id: user_id
				}
			}).then(function(user) {
				models.Recipe.findOne({
					where: {
						id: recipe_id
					}
				}).then(function(recipe) {
					user.addPaidRecipes(recipe).then(function() {
						return res.sendFile(path.join(__dirname + '/../public/payment-redirect.html'));
					});
				})
			})
		});
	}

	
});

router.post('/recipebook/checkout', function(req, res) {
	// var nonceFromTheClient = req.body.payment_method_nonce;
	var id = req.session.user_id;

	var recipebook_id = req.body.recipebook_id;
	var price = req.body.price;

	gateway.customer.search(function(search) {
		search.id().is(id);
	}, function(err, response) {
		if(err) {
			console.log(err);
		}
		console.log("This is the response", response);

		if (response.ids.length > 0) {
			response.each(function(err, customer) {
				console.log("This is the customer", customer);
				transaction(id);
			});
		} else {
			gateway.customer.create({
				id: req.session.user_id,
				firstName: req.session.username,
				email: req.session.user_email
			}, function(err, result) {
				console.log(result);
				transaction(id);
			});
		}
	});
	
	function transaction(user_id) {
		gateway.transaction.sale({
			amount: price,
			paymentMethodNonce: 'fake-valid-nonce',
			customerId: user_id,
			options: {
				submitForSettlement: true
			}
		}, function(err, result) {
			if(err) {
				console.log(err);
				return;
			}
			console.log(result);
			models.Users.findOne({
				where: {
					id: user_id
				}
			}).then(function(user) {
				models.Recipebook.findOne({
					where: {
						id: recipe_id
					}
				}).then(function(recipebook) {
					user.addPaidRecipebooks(recipebook).then(function() {
						return res.sendFile(path.join(__dirname + '/../public/payment-redirect.html'));
					});
				})
			})
		});
	}

	
});

module.exports = router;