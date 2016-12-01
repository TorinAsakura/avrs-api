import { storeStat } from '../../routes/sessions/services'

export default async (_, { sessionId, value }, { checkAuth }) => {
  checkAuth()

  await storeStat(sessionId, value)

  return true
}
