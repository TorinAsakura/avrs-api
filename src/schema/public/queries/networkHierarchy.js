import { getNetworkHierarchy } from '../../../routes/users/services'

export default async (_, params, { user, checkAuth }) => {
  checkAuth()

  return await getNetworkHierarchy(user)
}
