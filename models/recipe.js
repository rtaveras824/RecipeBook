'use strict';
module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    ingredients: DataTypes.JSON,
    steps: DataTypes.JSON,
    private: DataTypes.BOOLEAN,
    price: DataTypes.FLOAT,
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