/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import moment from 'moment'
import db from '../../../db'
import User from '../../users/models/user'

const Session = db.define('session', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  date: {
    type: Sequelize.DATEONLY,
    get: function () {
      return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD')
    },
    defaultValue: new Date(),
  },
  time: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  startAt: {
    type: Sequelize.DATE,
  },
  endAt: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.ENUM('OPENED', 'CLOSED', 'CALCULATED'), // eslint-disable-line new-cap
    defaultValue: 'OPENED',
  },
})

Session.belongsTo(User)

export default Session
