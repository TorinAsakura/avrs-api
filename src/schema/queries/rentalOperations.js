import { getRentalOperations } from '../../routes/operations/services'

export default async (_, params, { user, checkAuth }) => {
  checkAuth()

  return await getRentalOperations(user.id)
}
