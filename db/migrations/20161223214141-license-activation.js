'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('activations', 'license', {
      type: Sequelize.STRING,
      // TODO: allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('activations', 'license')
  }
};
