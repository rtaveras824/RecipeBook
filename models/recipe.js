'use strict';
module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    ingredients: DataTypes.JSON,
    steps: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Recipe.belongsTo(models.Users);
        Recipe.belongsToMany(models.RecipeBook, {through: "RecipeBookRecipe"});
      }
    }
  });
  return Recipe;
};