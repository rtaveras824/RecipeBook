var sequelize = require("sequelize");
var models = require("./models");
var Dan;
var Bob;


// We run this query so that we can drop our tables even though they have foreign keys
models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function() {
	return models.sequelize.sync({force:true});
})

//create Dummy users
.then(function(){
	return models.Users.create({
		username: "Danroxxmysocks",
		image: "http://placehold.it/350x150",
		description: "This is a dummy user0",
		passcode: "passcode0",
		email: "email0@email.com"

	}).then(function(user){
		return Dan = user;
	})
})

.then(function(){
	return models.Users.create({
		username: "Bobbytheman",
		image: "http://placehold.it/350x150",
		description: "This is a dummy user 1",
		passcode: "passcode1",
		email: "email1@email.com"

	}).then(function(user){
		return Bob = user;
	})
})
//user put in recipies
.then(function(){
	return models.Recipe.create({
		name: "Please Ignore Recipe",
		description: "This is a mistake",
		ingredients: "1 large egg, beaten 1 teaspoon water",
		steps: "None"}
	})
	.then(function(recipe){
		Dan.addUserRecipes(recipe)
		Bob.addFavoriteRecipes(recipe)
	})

})
//set favorite
.then(function(){
	Bob.addFollower(Dan);
})
//set recipe book
.then(function(){
	return models.RecipeBook.create({
		name: "Ignore this recipe book",
		price: 20.00

	})
	.then(function(book){
		// console.log(book);
		Dan.addUserRecipeBooks(book);
		Bob.addPaidRecipeBooks(book);
	})
	// .then(function(){
	// // models.RecipeBook.findOne({where: {name:"Ignore this recipe book"}})
	// // .then(function(book){
	// // 	console.log(book);
	// // })
	// return Dan.getRecipeBooks().then(function(books){
		
	// })
	
})
//put recipe in book.
.then(function(){
	models.RecipeBook.findOne({where:{name: "Ignore this recipe book"}})
	.then(function(book){
		models.Recipe.findOne({where: {name: "Please Ignore Recipe"}})
		.then(function(recipe){
			return book.addRecipeBookRecipes(recipe);
		})
	})
})
.then(function(){
	return models.RecipeBook.create({
		name: "Dan's Awesome Food",

	})
	.then(function(book){
		console.log(book);
		Dan.addUserRecipeBooks(book)
	})

})
.then(function(){
	return models.RecipeBook.create({
		name: "Bob's Burgers",

	})
	.then(function(book){
		console.log(book);
		Bob.addUserRecipeBooks(book)
		Dan.addUserFavoriteRecipeBooks(book);
	})

})
//put dans recipe in his recipe book
.then(function() {
	return models.Recipe.create({
		name: "Super Awesome Chicken Recipe",
		description: "This is a mistake",
		ingredients: "1 large egg, beaten, 1 teaspoon water",
		steps: "None",
		private: false,
		price: 5.00
	}).then(function(recipe) {
		Dan.addUserRecipes(recipe);
		Bob.addPaidRecipes(recipe);
	})
})
