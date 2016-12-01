import moment from 'moment'
import Session from '../models/session'

// check user has plan | user is active

export default async (user, startAt) => {
  // check startAt
  // startAt not before last session

  const periodQuery = {
    userId: user.id,
    startAt: {
      $lt: moment(new Date(startAt)).endOf('day').toDate(),
      $gt: moment(new Date(startAt)).startOf('day').toDate(),
    },
  }

  const sessions = await Session.findAll({ where: periodQuery })

  const [openedSession] = sessions.filter(session => session.status === 'OPENED')

  if (openedSession) {
    // console.log(openedSession)
    // throw new Error('Has opened session')
  }

  const usedTime = sessions.reduce((result, session) => result + session.time, 0)
  const plan = user.Activations[0].servicePlan

  const leftTime = (plan.time * 60 * 60) - usedTime

  const session = await Session.create({ userId: user.id, startAt: new Date(startAt) })

  return {
    id: session.id,
    time: session.time,
    leftTime,
    status: session.status,
  }
}
