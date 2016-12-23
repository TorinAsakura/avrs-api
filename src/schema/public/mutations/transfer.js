import { transfer } from '../../../routes/operations/services'

export default async (_, { amount }, { checkAuth, user }) => {
  checkAuth()

  return await transfer(amount, user)
}
