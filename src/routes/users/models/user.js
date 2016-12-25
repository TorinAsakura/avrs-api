/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import { randomString } from 'crypto-extra'
import Sequelize from 'sequelize'
import moment from 'moment'
import db from '../../../db'
import Activation from './activation'

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
  phone: {
    type: Sequelize.STRING,
  },
  sex: {
    type: Sequelize.ENUM('male', 'female'),
    defaultValue: 'male',
  },
  birthday: {
    type: Sequelize.DATE,
  },
  address: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  activateToken: {
    type: Sequelize.STRING,
  },
  resetToken: {
    type: Sequelize.STRING,
  },
  rentalBalance: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  referalBalance: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  salesBalance: {
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
  status: {
    type: Sequelize.ENUM('NEW', 'ACTIVE', 'INACTIVE'), // eslint-disable-line new-cap
    defaultValue: 'NEW',
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
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
    sponsorId: function () {
      return this.getDataValue('networkPath').slice(-1).pop()
    },
    parentNetworkPath: function () {
      return this.getDataValue('networkPath')
    },
    balance: function () {
      return this.getDataValue('rentalBalance')
    },
    servicePlan: function () {
      const [activation] = (this.Activations || []).filter(({ startAt, expireAt }) => {
        return moment().isBetween(startAt, expireAt)
      })

      return activation ? activation.servicePlan : null
    },
    agentsNetworkPath: function () {
      return this.getDataValue('networkPath')
    },
    level: function () {
      const amount = this.getDataValue('salesBalance')

      if (amount < 5000) {
        return 0.05
      } else if (amount < 20000) {
        return 0.1
      } else if (amount < 60000) {
        return 0.13
      } else if (amount < 120000) {
        return 0.16
      } else if (amount < 250000) {
        return 0.18
      }

      return 0.2
    },
  },
  instanceMethods: {
    referals() {
      return User.count({
        where: {
          networkPath: {
            $contains: this.networkPath,
          },
        },
      })
    },
    sponsor() {
      if (this.sponsorId) {
        return User.findById(this.sponsorId, { attributes: ['id', 'firstName', 'lastName'] })
      }

      return null
    },
  },
})

User.hasMany(Activation, { as: 'Activations' })
Activation.belongsTo(User)

export default User
