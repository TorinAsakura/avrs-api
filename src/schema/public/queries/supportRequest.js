import { getRequest } from '../../../routes/support/services'

export default async (_, { id }, { checkAuth }) => {
  checkAuth()

  return await getRequest(id)
}
