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
	res.render('payment');
});

router.get('/client_token', function(req, res) {
	gateway.clientToken.generate({}, function(err, response) {
		console.log(response.clientToken);
		res.render('payment', { client_token: response.clientToken });
	});
});

router.post('/checkout', function(req, res) {
	// var nonceFromTheClient = req.body.payment_method_nonce;

	gateway.transaction.sale({
		amount: '10.00',
		paymentMethodNonce: 'fake-valid-nonce',
		options: {
			submitForSettlement: true
		}
	}, function(err, result) {
		if(err) {
			console.log(err);
			return;
		}
		console.log(result);
	});
});

module.exports = router;