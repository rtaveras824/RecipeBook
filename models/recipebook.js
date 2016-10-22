'use strict';
module.exports = function(sequelize, DataTypes) {
  var RecipeBook = sequelize.define('RecipeBook', {
    name: DataTypes.STRING,
    private: {type: DataTypes.BOOLEAN, defaultValue: false},
    price: ({type: DataTypes.FLOAT, defaultValue: false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        RecipeBook.belongsToMany(models.Recipe, {through: "RecipeBookRecipe"});
        RecipeBook.belongsTo(models.Users);
      }
    }
  });
  return RecipeBook;
};