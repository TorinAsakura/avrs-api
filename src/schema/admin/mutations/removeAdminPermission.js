import { getUser } from '../../../routes/users/services'

export default async (_, { id }) => {
  const user = await getUser(id)

  user.isAdmin = false

  return await user.save()
}
