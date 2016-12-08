import { getUser } from '../../../routes/users/services'

export default async (_, { id }) => {
  return await getUser(id)
}
