var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get("/create_new_recipebook", function(req, res){

	res.render('new_recipebook', {user_id: req.session.user_id})

})

router.post("/create", function(req, res){
	var new_recipebook = req.body
	
	console.log(new_recipebook);

	models.RecipeBook.create(new_recipebook)
	.then(function(recipebook){
		var userId = req.session.user_id;
		console.log(userId)
		models.Users.findOne({where:{id: userId}})
		.then(function(user){
			user.addUserRecipeBook(recipebook)
			.then(function(){
				res.redirect('/user/'+req.session.user_id+'/recipebook')
			})
		})
	})
	// models.RecipeBook.create(req.body)
})

router.get("/:recipeBookId", function(req,res){

	var recipeBookId = req.params.recipeBookId;

	models.RecipeBook.findOne({where:{id: recipeBookId}})
	.then(function(book){
		book.getRecipeBookRecipes()
		.then(function(recipes){
			models.Recipe.findAll({where:{UserId: req.session.user_id}})
			.then(function(userrecipes){
				res.render('recipebookrecipes', {arrayOfSearchResults: recipes, allrecipes: userrecipes, recipeBookId: recipeBookId })
		})
			})
			
	})
})

router.put("/update", function(req, res){

})

router.post("/:recipeBookId/addRecipe", function(req, res){
	var recipe = req.body;
	console.log(recipe);
	console.log("-------")
	models.Recipe.findOne({where: {id:recipe.recipeId}})
	.then(function(recipe){
		console.log(recipe);
		console.log("-------")
		models.RecipeBook.findOne({where:{id:req.params.recipeBookId}})
		.then(function(book){
			console.log(book);
			console.log("-------")
			book.addRecipeBookRecipes(recipe)
			.then(function(){
				res.redirect('/recipebook/'+req.params.recipeBookId)
			})
		})
	})
})

router.delete("/delete", function(req, res){

})



module.exports = router;