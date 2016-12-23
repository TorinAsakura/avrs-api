import { getOperations } from '../../../routes/operations/services'

export default async (_, params, { user, checkAuth }) => {
  checkAuth()

  return await getOperations(user.id)
}
