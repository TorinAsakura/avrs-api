/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import db from '../../../db'
import User from '../../users/models/user'

const RentalOperation = db.define('rentalOperation', {
  date: {
    type: Sequelize.DATE,
    defaultValue: function () {
      return new Date()
    },
  },
  amount: {
    type: Sequelize.FLOAT,
  },
  package: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.INTEGER,
  },
})

RentalOperation.belongsTo(User)

export default RentalOperation
