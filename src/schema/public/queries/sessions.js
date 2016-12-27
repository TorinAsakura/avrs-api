import { getSessions } from '../../../routes/sessions/services'

export default async (_, { from, to, activations }, { user, checkAuth }) => {
  checkAuth()

  return await getSessions(user.id, from, to, activations)
}
