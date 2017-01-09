import { cancelInternalOperation } from '../../../routes/operations/services'

export default async (_, { id }) => {
  return await cancelInternalOperation(id)
}
