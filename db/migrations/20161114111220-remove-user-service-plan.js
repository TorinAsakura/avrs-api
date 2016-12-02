'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'servicePlan')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'servicePlan', { type: Sequelize.STRING })
  }
};
