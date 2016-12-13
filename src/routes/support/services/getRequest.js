import Request from '../models/Request'
import RequestMessage from '../models/RequestMessage'

export default (id) => {
  return Request.findById(id, {
    include: [{
      model: RequestMessage,
      as: 'messages',
    }],
  })
}
