import { validate } from '../../../validation/validator'
import createRequestMessage from '../constraints/createRequestMessage'
import RequestMessage from '../models/RequestMessage'

export default async (requestId, type, message) => {
  await validate([createRequestMessage], { message })

  return await RequestMessage.create({
    requestId,
    type,
    body: message,
  })
}
