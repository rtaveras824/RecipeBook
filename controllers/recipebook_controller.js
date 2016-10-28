var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get("/create_new_recipebook", function(req, res){

	res.render('new_recipebook')

})

router.post("/create", function(req, res){
	var new_recipebook = req.body
	
	console.log(new_recipebook);

	models.RecipeBook.create(new_recipebook)
	.then(function(recipebook){
		var userId = req.session.user_id;
		console.log(userId)
		models.User.findOne({where:{id: userId}})
		.then(function(user){
			user.addUserRecipeBook(recipebook)
			.then(function(){
				res.redirect('/user/'+req.session.user_id+'/recipebooks')
			})
		})
	})
	// models.RecipeBook.create(req.body)
})

router.get("/:recipeBookId", function(req,res){

})

router.put("/update", function(req, res){

})

router.post(":recipeBookId/addRecipe", function(req, res){
	var recipe = req.body;
	models.Recipe.findOne({where: {id:recipe.id}})
	.then(function(recipe){
		models.RecipeBook.findOne({where:{id:req.params.recipeBookId}})
		.then(function(book){
			book.addRecipe(recipe)
			.then(function(){
				res.redirect('/')
			})
		})
	})
})

router.delete("/delete", function(req, res){

})

module.exports = router;