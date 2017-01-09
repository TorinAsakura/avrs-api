import User from '../../users/models/user'
import Operation from '../models/Operation'

export default async () => {
  return await Operation.findAll({
    include: [{
      model: User,
      as: 'user',
    }],
  })
}
