import Session from '../models/session'
import { calculateRental, calculateReferal } from '../../operations/services'

export default async (userId, startAt, time) => {
  const session = await Session.create({ userId, startAt: new Date(startAt), time, status: 'CLOSED' })

  const rentalOperation = await calculateRental(session)

  await calculateReferal(rentalOperation)

  return session
}
