import { stopActivation } from '../../../routes/users/services'

export default async (_, { id }, { checkAuth }) => {
  checkAuth()

  return await stopActivation(id)
}
