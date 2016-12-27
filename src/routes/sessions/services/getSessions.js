import Session from '../models/session'
import Activation from '../../users/models/activation'

export default async (userId, from, to, activations = []) => {
  return await Session.findAll({
    where: {
      userId,
      createdAt: {
        $gt: from,
        $lt: to,
      },
      activationId: {
        $in: activations,
      },
    },
    include: [{
      model: Activation,
      as: 'activation',
    }],
  })
}
