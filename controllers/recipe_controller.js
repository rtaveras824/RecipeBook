//require models and express
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
	res.render('recipes', {
		user_id: req.session.user_id
	});
})

router.get('/add', function(req, res){
	res.render('add_recipe_form', {
		user_id: req.session.user_id
	});

})

router.post('/create',function(req, res){
	console.log(req.body.name);
	models.Recipe.create({
			name: req.body.name,
			description: req.body.description,
			ingredients: req.body.ingredients,
			steps: req.body.steps
	
	}).then(function(recipe){
		res.redirect('/');
	})
});
router.get('/:id',function(req, res){
	var id = req.params.id;
	models.Recipe.findOne({
		where: {
			id: id
		}
	}).then(function(recipe){
		console.log(recipe);
		res.render('recipe', {
			user_id: req.session.user_id,
			recipe2: recipe
		})
	})
	
})




module.exports = router;