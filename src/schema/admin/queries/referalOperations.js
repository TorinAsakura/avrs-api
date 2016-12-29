import { getReferalOperations } from '../../../routes/operations/services'

export default async (_, { id }) => {
  return await getReferalOperations(id)
}
