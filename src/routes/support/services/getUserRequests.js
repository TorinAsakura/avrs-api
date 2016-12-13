import Request from '../models/Request'
import RequestMessage from '../models/RequestMessage'

export default (userId) => {
  return Request.findAll({
    where: {
      userId,
    },
    include: [{
      model: RequestMessage,
      as: 'messages',
    }],
  })
}
