import { withdrawToBitcoin } from '../../../routes/operations/services'

export default async (_, { amount }, { checkAuth, user }) => {
  checkAuth()

  return await withdrawToBitcoin(amount, user)
}
