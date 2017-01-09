import { withdrawToCard } from '../../../routes/operations/services'

export default async (_, { amount }, { checkAuth, user }) => {
  checkAuth()

  return await withdrawToCard(amount, user)
}
