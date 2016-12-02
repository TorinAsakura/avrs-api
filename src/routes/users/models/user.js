/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import { randomString } from 'crypto-extra'
import Sequelize from 'sequelize'
import moment from 'moment'
import db from '../../../db'
import Activation from './activation'
import Position from './position'

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  activateToken: {
    type: Sequelize.STRING,
  },
  resetToken: {
    type: Sequelize.STRING,
  },
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  inviteCode: {
    type: Sequelize.STRING,
    set: function () {},
    defaultValue: function () {
      return randomString(10)
    },
  },
  schedule: {
    type: Sequelize.JSON,
    defaultValue: function () {
      const plan = {
        time: 10,
      }

      const startTime = moment().startOf('day').add(Math.floor((24 - plan.time) / 2), 'hour')
      const dayValues = Array.from(Array(plan.time).keys()).map(() => startTime.add(1, 'hour').format('HH:mm'))

      return {
        mon: dayValues,
        tue: dayValues,
        wed: dayValues,
        thu: dayValues,
        fri: dayValues,
        sat: dayValues,
        sun: dayValues,
      }
    },
  },
  networkPath: {
    type: Sequelize.JSONB,
    defaultValue: [],
    get: function () {
      return this.getDataValue('networkPath').concat([this.getDataValue('id')])
    },
  },
}, {
  getterMethods: {
    servicePlan: function () {
      const [activation] = (this.Activations || []).filter(({ startAt, expireAt }) => {
        return moment().isBetween(startAt, expireAt)
      })

      return activation ? activation.servicePlan : null
    },
    agentsNetworkPath: function () {
      return this.getDataValue('networkPath')
    },
  },
})

Activation.belongsTo(User)
User.hasMany(Activation, { as: 'Activations' })

Position.belongsTo(User)
User.hasMany(Position, { as: 'position' })

export default User
