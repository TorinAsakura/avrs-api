'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'cardNumber', {
      type: Sequelize.STRING,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'cardNumber')
  }
};
