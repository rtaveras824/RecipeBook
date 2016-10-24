'use strict';
module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    ingredients: DataTypes.JSON,
    steps: DataTypes.JSON,
    private:{type:DataTypes.BOOLEAN,defaultValue:false},
    price: {type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Recipe.belongsTo(models.Users, {through: "UserRecipe"});
        // Recipe.belongsTo(models.Users, {through: "UserPaidRecipe"});
      }
    }
  });
  return Recipe;
};