'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'status', {
      type: Sequelize.ENUM('NOT_ACTIVATED', 'NEW', 'ACTIVE', 'INACTIVE'),
      defaultValue: 'NOT_ACTIVATED',
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'status')
  }
};
