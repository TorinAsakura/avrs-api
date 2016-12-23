'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('operations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      direction: {
        type: Sequelize.ENUM('INTERNAL', 'EXTERNAL'),
        defaultValue: 'INTERNAL',
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('SENT', 'PERFORMED', 'NOT_PERFORMED'),
        defaultValue: 'SENT',
        allowNull: false,
      },
      data: {
        type: Sequelize.JSONB,
        defaultValue: {},
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('operations')
  }
}
