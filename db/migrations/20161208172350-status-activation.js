'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('activations', 'status', {
      type: Sequelize.ENUM('INACTIVE', 'ACTIVE', 'STOPPED', 'EXPIRED'),
      defaultValue: 'INACTIVE',
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('activations', 'status')
  }
};
