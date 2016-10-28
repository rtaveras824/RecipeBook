'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },

      description:{
        type: Sequelize.TEXT
      },
      image:{
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.TEXT
      },
      steps: {
        type: Sequelize.TEXT
      },
      private:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      price:{
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Recipes');
  }
};