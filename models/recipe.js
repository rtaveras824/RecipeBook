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
        Recipe.hasOne(models.Users);
        Recipe.hasMany(models.RecipeBook);
      }
    }
  });
  return Recipe;
};