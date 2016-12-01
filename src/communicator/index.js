import moment from 'moment'
import redisClient from '../redisClient'
import User from '../routes/users/models/user'
import Activation from '../routes/users/models/activation'
import { createSession, calculateLeftTime } from '../routes/sessions/services'

const handleSessionStart = async ({ startAt }, socket, { userId }) => {
  const user = await User.findById(userId, {
    include: [{
      model: Activation,
      as: 'Activations',
    }],
  })

  const leftTime = await calculateLeftTime(user, startAt)

  socket.emit('session:started', { leftTime })

  const session = {
    clientStartAt: startAt,
    startAt: new Date(),
  }

  redisClient.set(`session-${userId}`, JSON.stringify(session))
}

const handleSessionClose = async (data, socket, { userId }) => {
  const session = await redisClient.getAsync(`session-${userId}`)

  if (!session) {
    return
  }

  const { clientStartAt, startAt } = JSON.parse(session)

  await createSession(userId, clientStartAt, moment(moment()).diff(startAt, 'seconds'))

  redisClient.del(`session-${userId}`)
}

const isAgent = (sockets, id) => {
  return sockets[id] && sockets[id].clientType === 'agent'
}

const isClient = (sockets, id) => {
  return sockets[id] && sockets[id].clientType === 'client'
}

const communicator = async (io, socket) => {
  const { decoded_token: payload, _query: query } = socket.conn.request

  const userId = socket.userId = payload.id
  const type = socket.clientType = query.type || 'client'

  // agent connection store in redis and check if exists

  if (!io.accounts[userId]) {
    io.accounts[userId] = []
  }

  io.accounts[userId].push(socket.id)

  if (type === 'agent') {
    socket.on('session:start', data => handleSessionStart(data, socket, { userId }))
    socket.on('disconnect', data => handleSessionClose(data, socket, { userId }))
    socket.on('stat', data => {
      io.accounts[userId].forEach((id) => {
        if (isClient(io.sockets.connected, id)) {
          io.sockets.connected[id].emit('stat', data)
        }
      })
    })

    const clients = io.accounts[userId].filter((id) => isClient(io.sockets.connected, id))

    if (clients.length > 0) {
      socket.emit('sendStat', true)
    }
  } else {
    io.accounts[userId].forEach((id) => {
      const target = io.sockets.connected[id]

      if (target && target.clientType === 'agent') {
        target.emit('sendStat', true)
      }
    })
  }

  socket.on('disconnect', () => {
    const connections = io.accounts[userId]

    if (connections) {
      connections.splice(connections.indexOf(socket.id), 1)
    }

    const clients = connections.filter(id => isClient(io.sockets.connected, id))

    if (clients.length === 0) {
      const [agent] = connections.filter(id => isAgent(io.sockets.connected, id))

      if (agent) {
        io.sockets.connected[agent].emit('sendStat', false)
      }
    }
  })
}

export default communicator
