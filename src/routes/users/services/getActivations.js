import moment from 'moment'
import User from '../models/user'
import Activation from '../models/activation'

export default async (user) => {
  const participants = await User.findAll({
    attributes: ['id', 'networkPath'],
    where: {
      networkPath: {
        $contains: user.networkPath,
      },
    },
  })

  const users = participants.reduce((result, { networkPath }) => {
    networkPath.forEach((id) => {
      if (!result.includes(id) && user.id !== id) {
        result.push(id)
      }
    })

    return result
  }, [])

  const activations = Activation.findAll({
    where: {
      userId: {
        $in: users,
      },
      createdAt: {
        $gt: moment().subtract(10, 'd'),
        $lt: moment(),
      },
    },
  })

  return activations
}
