import { getUserRequests } from '../../../routes/support/services'

export default async (_, { id }, { user, checkAuth }) => {
  checkAuth()

  return await getUserRequests(user.id)
}
