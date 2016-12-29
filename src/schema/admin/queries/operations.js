import { getOperations } from '../../../routes/operations/services'

export default async (_, { id }) => {
  return await getOperations(id)
}
