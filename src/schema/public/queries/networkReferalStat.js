import { getUser } from '../../../routes/users/services'

export default async (_, { id }, { checkAuth }) => {
  checkAuth()

  // check if referal in network

  return await getUser(id)
}
