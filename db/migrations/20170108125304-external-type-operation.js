'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('operations', 'externalType', {
      type: Sequelize.ENUM('CARD', 'BTC'),
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('operations', 'externalType')
  }
};
