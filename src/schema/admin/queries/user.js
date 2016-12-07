import { getUser } from '../../../routes/users/services'

export default (_, { id }) => {
  return getUser(id)
}
