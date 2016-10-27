//require models and express
var models  = require('../models'),
	path = require('path'),
	express = require('express'),
	router  = express.Router();

router.get('/', function (req, res){
	var button = '';
	if (req.session.user_id) {
		models.Recipe.findAll({
			attributes: ['id', 'name', 'description', 'image'],
			limit: 10
		}).then(function(recipes){
			console.log(recipes);
			res.render('index', { 
				title: 'Main',
				ogtitle: 'GET BACK TO WORK',
				recipes_array: recipes
			});
		})
		
	} else {
		res.sendFile(path.join(__dirname + '/../public/landing-page.html'));
	}
});

module.exports = router;