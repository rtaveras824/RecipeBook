'use strict';
module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    steps: DataTypes.TEXT,
    private:{type:DataTypes.BOOLEAN,defaultValue:false},
    price: {type: DataTypes.FLOAT, defaultValue: 0.00}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Recipe.belongsTo(models.Users, {through: "UserRecipe"});
        Recipe.belongsToMany(models.RecipeBook, {through: "RecipeBookRecipe"});
      }
    }
  });
  return Recipe;
};