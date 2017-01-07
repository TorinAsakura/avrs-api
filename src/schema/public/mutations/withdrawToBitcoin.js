import { withdrawToBitcoin } from '../../../routes/operations/services'

export default async (_, { amount, number }, { checkAuth, user }) => {
  checkAuth()

  return await withdrawToBitcoin(amount, number, user)
}
