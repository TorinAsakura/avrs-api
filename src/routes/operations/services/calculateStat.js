import moment from 'moment'
import db from '../../../db'
import RentalOperation from '../models/RentalOperation'
import ReferalOperation from '../models/ReferalOperation'

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
    [operation.createdAt]: (result[operation.createdAt] || 0) + operation.amount,
  }), {})

  return Array.from(Array(interval).keys()).reverse().map(day => {
    const date = moment().subtract(day + 1, 'days').startOf('day').toDate()

    return {
      date,
      amount: grouped[date] || 0,
    }
  })
}

export default async (userId, startAt) => {
  const period = getPeriod(startAt)

  const query = {
    attributes: [
      'id',
      'amount',
      [db.fn('date', db.col('createdAt')), 'createdAt'],
    ],
    where: {
      userId,
      createdAt: {
        $gt: moment().subtract(period, 'days').toDate(),
      },
    },
  }

  const [rental, referal] = await Promise.all([
    RentalOperation.findAll(query),
    ReferalOperation.findAll(query),
  ])

  return {
    rental: processOperations(rental, period),
    referal: processOperations(referal, period),
  }
}
