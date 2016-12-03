import ExternalSupportRequest from '../models/ExternalSupportRequest'

export default async (id, status) => {
  const request = await ExternalSupportRequest.findOne({ where: { id } })

  return await request.update({ status })
}
