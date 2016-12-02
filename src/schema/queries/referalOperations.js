import { getReferalOperations } from '../../routes/operations/services'

export default async (_, params, { user, checkAuth }) => {
  checkAuth()

  return await getReferalOperations(user.id)
}
