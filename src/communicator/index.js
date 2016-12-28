import moment from 'moment'
import redisClient from '../redisClient'
import Activation from '../routes/users/models/activation'
import { createSession, calculateLeftTime } from '../routes/sessions/services'

const loadSession = async (activationId) => {
  const session = await redisClient.getAsync(`session-${activationId}`)

  return session ? JSON.parse(session) : null
}

const handleSessionStart = async ({ activationId, startAt }, socket, { userId, machineId }) => {
  const saved = await loadSession(activationId)

  if (saved && saved.activationId === activationId) {
    socket.emit('session:used')
    return null
  }

  const activation = await Activation.findById(activationId)

  if (!(activation && !activation.isExpired())) {
    socket.emit('session:expired')

    return null
  }

  if (activation.userId !== userId) {
    socket.emit('session:unknown')

    return null
  }

  const now = moment().utc().valueOf()
  const startAtTime = (now - startAt) < 6000 ? startAt : now

  const leftTime = await calculateLeftTime(userId, activation, startAtTime)

  const session = {
    activationId,
    machineId,
    startAt: startAtTime,
  }

  socket.activationId = activationId

  redisClient.set(`session-${activationId}`, JSON.stringify(session))

  socket.emit('session:started', { leftTime })

  return null
}

const handleSessionClose = async (data, socket, { userId }) => {
  const activationId = socket.activationId

  const session = await redisClient.getAsync(`session-${activationId}`)

  if (!session) {
    return
  }

  const { startAt } = JSON.parse(session)
  const clientStartAt = moment(startAt).toDate()

  await createSession(userId, activationId, clientStartAt, moment(moment()).diff(startAt, 'seconds'))

  redisClient.del(`session-${activationId}`)
  socket.activationId = null
}

const handleSessionRestore = async ({ activationId }, socket) => {
  const saved = await loadSession(activationId)

  if (saved && !socket.activationId) {
    socket.activationId = activationId
  }
}

const communicator = async (io, socket) => {
  const { decoded_token: payload, _query: query } = socket.conn.request

  const userId = socket.userId = payload.id
  const type = socket.clientType = query.type || 'client'
  const machineId = socket.machineId = query.machineId

  if (!io.accounts[userId]) {
    io.accounts[userId] = []
  }

  io.accounts[userId].push(socket.id)

  if (type === 'agent') {
    socket.on('session:start', data => handleSessionStart(data, socket, { userId, machineId }))
    socket.on('session:stop', data => handleSessionClose(data, socket, { userId, machineId }))
    socket.on('session:restore', data => handleSessionRestore(data, socket, { userId, machineId }))
    socket.on('disconnect', data => handleSessionClose(data, socket, { userId, machineId }))
  }

  socket.on('disconnect', () => {
    const connections = io.accounts[userId]

    if (connections) {
      connections.splice(connections.indexOf(socket.id), 1)
    }
  })
}

export default communicator
