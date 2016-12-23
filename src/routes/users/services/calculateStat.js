import moment from 'moment'
import db from '../../../db'
import User from '../models/user'
import Activation from '../models/activation'

const getPeriod = (startAt) => {
  const diff = moment(startAt).diff(moment(), 'days')

  if (diff <= 2) {
    return 3
  } else if (diff < 30) {
    return diff + 1
  }

  return 30
}

const processOperations = (operations, interval) => {
  const grouped = operations.reduce((result, operation) => ({
    ...result,
    [operation.createdAt]: (result[operation.createdAt] || 0) + 1,
  }), {})

  return Array.from(Array(interval).keys()).reverse().map(day => {
    const date = moment().subtract(day, 'days').startOf('day').toDate()

    return {
      date,
      amount: grouped[date] || 0,
    }
  })
}

export default async (user) => {
  const period = getPeriod(user.createdAt)

  const users = await User.findAll({
    attributes: ['id'],
    where: {
      networkPath: {
        $contains: user.networkPath,
      },
    },
  })

  const network = users.map(({ id }) => id)

  const [connections, activations] = await Promise.all([
    User.findAll({
      attributes: [
        'id',
        [db.fn('date', db.col('createdAt')), 'createdAt'],
      ],
      where: {
        id: {
          $in: network,
        },
        createdAt: {
          $gt: moment().subtract(period, 'days').toDate(),
        },
      },
    }),
    Activation.findAll({
      attributes: [
        'id',
        [db.fn('date', db.col('createdAt')), 'createdAt'],
      ],
      where: {
        userId: {
          $in: network,
        },
        createdAt: {
          $gt: moment().subtract(period, 'days').toDate(),
        },
      },
    }),
  ])

  return {
    connections: processOperations(connections, period),
    activations: processOperations(activations, period),
  }
}
