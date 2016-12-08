'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'status', {
      type: Sequelize.ENUM('NEW', 'ACTIVE', 'INACTIVE'),
      defaultValue: 'NEW',
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'status')
  }
};
