import { calculateStat } from '../../../routes/users/services'

export default async (_, params, { user, checkAuth }) => {
  checkAuth()

  return await calculateStat(user)
}
