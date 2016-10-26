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
		models.User.findOne({where:{id: userId}})
		.then(function(user){
			user.addUserRecipeBook(recipebook)
			.then(function(){
				res.redirect('/user/'+userId)
			})
		})
	})
	// models.RecipeBook.create(req.body)
})

router.get("/:userId", function(req, res){

})

router.get("/:userId/:recipeBookId", function(req, res){

})

router.put("/update", function(req, res){

})

router.post("/addRecipe", function(req, res){

})

router.delete("/delete", function(req, res){

})

module.exports = router;