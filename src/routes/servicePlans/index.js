import { AsyncRouter } from 'express-async-router'
import config from '../../config'

const router = new AsyncRouter()

router.get('/service_plans', async (req, res) => {
  res.json(config.get('servicePlans'))
})

export default router
