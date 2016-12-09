import moment from 'moment'
import Activation from '../models/activation'

export default async (id) => {
  const activation = await Activation.findById(id)

  if (!activation.isActive()) {
    return activation
  }

  const usedTime = moment().diff(activation.startAt, 'seconds') + activation.usedTime

  return await activation.update({
    usedTime,
    startAt: null,
    status: 'STOPPED',
  })
}
