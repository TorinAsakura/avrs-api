import { calculateStat } from '../../../routes/operations/services'

export default async (_, params, { user, checkAuth }) => {
  checkAuth()

  return await calculateStat(user.id, user.createdAt)
}
