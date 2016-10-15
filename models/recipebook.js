'use strict';
module.exports = function(sequelize, DataTypes) {
  var RecipeBook = sequelize.define('RecipeBook', {
    name: DataTypes.STRING,
    private: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        RecipeBook.hasMany(models.Recipe);
        RecipeBook.hasOne(models.Users);
      }
    }
  });
  return RecipeBook;
};