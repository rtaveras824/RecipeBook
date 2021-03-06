'use strict';
module.exports = function(sequelize, DataTypes) {
  var RecipeBook = sequelize.define('RecipeBook', {
    name: DataTypes.STRING,
    private: {type: DataTypes.BOOLEAN, defaultValue: false},
    price: {type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // RecipeBook.hasMany(models.Recipe);
        // RecipeBook.hasMany(models.Users);
        RecipeBook.belongsToMany(models.Recipe, {as: "RecipeBookRecipes", through: "RecipeBookRecipe"});
      }
    }
  });
  return RecipeBook;
};