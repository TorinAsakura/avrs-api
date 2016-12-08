import User from '../models/user'
import Activation from '../models/activation'

export default async (id) => {
  return User.findById(id, {
    include: [{
      model: Activation,
      as: 'Activations',
    }],
  })
}
