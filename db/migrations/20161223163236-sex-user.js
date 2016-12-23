'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'sex', {
      type: Sequelize.ENUM('male', 'female'),
      defaultValue: 'male',
      // TODO: allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'sex')
  }
};
