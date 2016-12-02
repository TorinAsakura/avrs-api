import moment from 'moment'
import Session from '../models/session'

export default async (user, startAt) => {
  const sessions = await Session.findAll({
    where: {
      userId: user.id,
      startAt: {
        $lt: moment(startAt).endOf('day').toDate(),
        $gt: moment(startAt).startOf('day').toDate(),
      },
    },
  })

  const usedTime = sessions.reduce((result, session) => result + session.time, 0)

  return (user.servicePlan.time * 60 * 60) - usedTime
}
