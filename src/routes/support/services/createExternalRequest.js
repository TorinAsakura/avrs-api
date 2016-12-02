import { validate } from '../../../validation/validator'
import createExternalRequest from '../constraints/createExternalRequest'
import ExternalSupportRequest from '../models/ExternalSupportRequest'

export default async (email, subject, message) => {
  await validate([createExternalRequest], { email, subject, message })

  return await ExternalSupportRequest.create({ email, subject, message })
}
