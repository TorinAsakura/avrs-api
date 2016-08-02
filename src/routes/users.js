import { AsyncRouter } from 'express-async-router'
import { register, auth } from '../services/users'
import generateToken from '../utils/generateToken'

const router = new AsyncRouter()

router.post('/users/register', async (req, res) => {
  const user = await register(req.body)

  res.status(201).send(generateToken(user))
})

router.post('/users/auth', async (req, res) => {
  const user = await auth(req.body)

  res.status(200).send(generateToken(user))
})

router.get('/users/me', async (req, res) => {
  res.json(req.user)
})

export default router
