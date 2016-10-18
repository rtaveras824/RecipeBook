var sequelize = require("sequelize");
var models = require("./models");

models.sequelize.sync({force:true})
.then(function(){
	return models.Users.create({
		username: "User0",
		image: "http://placehold.it/350x150",
		description: "This is a dummy user",
		passcode: "passcode0",
		email: "email@email.com"

	})
})

// .then(function(){
// 	return models.Recipe.create({
// 		name: "Recipe0",
// 		ingredients: {
// 			array: ["ingredient0", "ingredient1", "ingredient2"]
			
// 		},
// 		steps: {
// 			array: ["step0", "step1", "step2"]
// 		}
// 	})
// })

