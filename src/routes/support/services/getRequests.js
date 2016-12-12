import Request from '../models/Request'
import RequestMessage from '../models/RequestMessage'

export default () => {
  return Request.findAll({
    include: [{
      model: RequestMessage,
      as: 'messages',
    }],
  })
}
