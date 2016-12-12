/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import db from '../../../db'
import Message from './RequestMessage'
import User from '../../users/models/user'

const Request = db.define('supportRequest', {
  status: {
    type: Sequelize.ENUM('OPEN', 'CLOSED'), // eslint-disable-line new-cap
    defaultValue: 'OPEN',
  },
  subject: {
    type: Sequelize.STRING,
  },
})

Request.belongsTo(User)
Request.hasMany(Message, { as: 'messages', foreignKey: 'requestId' })

export default Request
