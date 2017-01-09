import { cancelExternalOperation } from '../../../routes/operations/services'

export default async (_, { id }) => {
  return await cancelExternalOperation(id)
}
