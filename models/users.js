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
        Users.hasMany(models.Recipe, {as: "UserRecipes"});
        Users.hasMany(models.RecipeBook, {as: "UserRecipeBooks"});
        Users.belongsToMany(models.Recipe, {as: "PaidRecipes", through: "UserPaidRecipe"});
        Users.belongsToMany(models.RecipeBook, {as: "PaidRecipeBooks", through: "UserPaidRecipeBook"})
        Users.belongsToMany(models.Recipe, {as:"FavoriteRecipes", through:"UserFavoriteRecipe"});
        Users.belongsToMany(models.RecipeBook, {as:"UserFavoriteRecipeBooks", through: "UserFavoriteRecipeBook"});
        Users.belongsToMany(models.Users, {as:"Follower", through:"UserFollower"})

      }
    }
  });
  return Users;
};