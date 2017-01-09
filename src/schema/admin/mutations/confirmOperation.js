import { confirmOperation } from '../../../routes/operations/services'

export default async (_, { id }) => {
  return await confirmOperation(id)
}
