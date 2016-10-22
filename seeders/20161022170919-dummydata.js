'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users',[{
      username: "username0",
      passcode: "passcode0",
      image:"image0",
      description:"description0",
      email:"email0@email.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "username1",
      passcode: "passcode1",
      image:"image1",
      description:"description1",
      email:"email1@email.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('User', null, {});
  }
};
