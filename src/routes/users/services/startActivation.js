import Activation from '../models/activation'

export default async (id) => {
  const activation = await Activation.findById(id)

  if (activation.isActive() || activation.isExpired()) {
    return activation
  }

  return await activation.update({ startAt: new Date(), status: 'ACTIVE' })
}
