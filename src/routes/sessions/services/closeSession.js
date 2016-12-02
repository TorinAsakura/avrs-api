import Session from '../models/session'
import { calculateRental } from '../../operations/services'

export default async (id, time) => {
  const session = await Session.findOne({ where: { id } })

  if (!session) {
    throw new Error('Session not found')
  }

  if (session.status !== 'OPENED') {
    throw new Error('Session not opened')
  }

  await session.update({ time, status: 'CLOSED' })

  await calculateRental(session)

  return {
    id,
    leftTime: 0,
    time: session.time,
    status: session.status,
  }
}
