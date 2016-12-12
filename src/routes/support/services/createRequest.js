import { validate } from '../../../validation/validator'
import createRequest from '../constraints/createRequest'
import Request from '../models/Request'
import RequestMessage from '../models/RequestMessage'

export default async (userId, subject, message) => {
  await validate([createRequest], { subject, message })

  const request = await Request.create({
    userId,
    subject,
    messages: [{
      body: message,
    }],
  }, {
    include: [{
      model: RequestMessage,
      as: 'messages',
    }],
  })

  return request
}
