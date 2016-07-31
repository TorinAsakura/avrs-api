import { Router } from 'express'

const router = new Router()

router.get('/ping', (req, res) => res.json({ pong: true }))

export default router
