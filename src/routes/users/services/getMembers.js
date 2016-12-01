import moment from 'moment'
import User from '../models/user'

export default async (user) => {
  return await User.findAll({
    where: {
      networkPath: {
        $contains: user.networkPath,
      },
      createdAt: {
        $gt: moment().subtract(10, 'd'),
        $lt: moment(),
      },
    },
  })
}
