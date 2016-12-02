'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'servicePlanExpireAt')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'servicePlanExpireAt', { type: Sequelize.DATE })
  }
};
