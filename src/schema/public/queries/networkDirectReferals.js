import { getDirectReferals } from '../../../routes/users/services'

export default async (_, params, { user, checkAuth }) => {
  checkAuth()

  return await getDirectReferals(user)
}
