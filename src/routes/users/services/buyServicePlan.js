import moment from 'moment'
import Activation from '../models/activation'
import Position from '../models/position'

export default async function buyServicePlan(user, servicePlan) {
  const [lastExpired] = user.Activations.sort((left, right) => {
    return moment.utc(right.expireAt).diff(moment.utc(left.expireAt))
  })

  const startAt = lastExpired ? lastExpired.expireAt : new Date()

  const activation = await Activation.create({ startAt, servicePlan, userId: user.id })

  await Position.bulkCreate(user.networkPath.map(id => ({ userId: id, amount: activation.servicePlan.price })))

  return activation.servicePlan
}
