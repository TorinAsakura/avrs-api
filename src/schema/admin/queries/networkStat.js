import { calculateStat, getUser } from '../../../routes/users/services'

export default async (_, { id }) => {
  const user = await getUser(id)

  return await calculateStat(user)
}
