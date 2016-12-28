import User from '../../users/models/user'
import ReferalOperation from '../models/ReferalOperation'

export default async (userId) => {
  return await ReferalOperation.findAll({
    where: { userId },
    include: [{
      model: User,
      as: 'participant',
    }],
  })
}
