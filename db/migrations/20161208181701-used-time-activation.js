'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('activations', 'usedTime', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('activations', 'usedTime')
  }
};
