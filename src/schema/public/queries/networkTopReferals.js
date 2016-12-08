import { getTopReferals } from '../../../routes/users/services'

export default async (_, params, { user, checkAuth }) => {
  checkAuth()

  return await getTopReferals(user)
}
