import Activation from '../models/activation'
import User from '../models/user'

export default async (id) => {
  const activation = await Activation.findById(id)

  if (activation.isActive() || activation.isExpired()) {
    return activation
  }

  const user = await User.findById(activation.userId)

  if (user.status === 'NEW') {
    user.status = 'ACTIVE'
    await user.save()
  }

  return await activation.update({ startAt: new Date(), status: 'ACTIVE' })
}
