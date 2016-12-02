'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'inviteCode', {
      type: Sequelize.STRING,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'inviteCode')
  }
};
