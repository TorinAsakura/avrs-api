'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('sessions', 'activationId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('sessions', 'activationId')
  }
};
