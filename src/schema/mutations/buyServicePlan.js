import { buyServicePlan } from '../../routes/users/services'

export default async (_, { id }, { user, checkAuth }) => {
  checkAuth()

  return await buyServicePlan(user, id)
}
