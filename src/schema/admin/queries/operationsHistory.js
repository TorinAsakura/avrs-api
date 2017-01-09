import { getOperationsHistory } from '../../../routes/operations/services'

export default async (_, { id }) => {
  return await getOperationsHistory(id)
}
