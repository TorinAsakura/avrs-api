import { getRentalOperations } from '../../../routes/operations/services'

export default async (_, { id }) => {
  return await getRentalOperations(id)
}
