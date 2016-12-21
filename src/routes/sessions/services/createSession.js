import Session from '../models/session'
import { calculateRental, calculateReferal } from '../../operations/services'

export default async (userId, activationId, startAt, time) => {
  const session = await Session.create({ userId, activationId, startAt: new Date(startAt), time, status: 'CLOSED' })

  const rentalOperation = await calculateRental(session)

  if (rentalOperation) {
    await calculateReferal(rentalOperation)
  }

  return session
}
