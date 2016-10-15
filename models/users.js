'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    passcode: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany(models.Recipe);
        Users.hasMany(models.RecipeBook);
      }
    }
  });
  return Users;
};