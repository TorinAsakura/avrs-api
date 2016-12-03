import ExternalSupportRequest from '../models/ExternalSupportRequest'

export default async () => {
  return await ExternalSupportRequest.findAll()
}
