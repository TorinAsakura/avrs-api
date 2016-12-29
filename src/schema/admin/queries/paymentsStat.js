import { calculateStat } from '../../../routes/operations/services'
import { getUser } from '../../../routes/users/services'

export default async (_, { id }) => {
  const user = await getUser(id)

  return await calculateStat(user.id, user.createdAt)
}
