'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'schedule', { type: Sequelize.JSON })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'schedule')
  }
};
