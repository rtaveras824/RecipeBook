var sequelize = require("sequelize");
var models = require("./models");

models.sequelize.sync().then(function(){
	console.log("Is it working?")
});