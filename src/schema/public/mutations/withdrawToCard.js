import { withdrawToCard } from '../../../routes/operations/services'

export default async (_, { amount, number }, { checkAuth, user }) => {
  checkAuth()

  return await withdrawToCard(amount, number, user)
}
