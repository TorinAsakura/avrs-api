'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('sessions', 'status', {
      type: Sequelize.ENUM('OPENED', 'CLOSED', 'CALCULATED'),
      defaultValue: 'OPENED',
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('sessions', 'status')
  }
};
