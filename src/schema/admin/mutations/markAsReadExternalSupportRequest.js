import { changeStatusExternalRequest } from '../../../routes/support/services'

export default async (_, { id }) => {
  return await changeStatusExternalRequest(id, 'CLOSED')
}
