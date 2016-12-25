import { MCrypt } from 'mcrypt'
import config from '../../../config'

export default async (_, { type, period }, { user }) => {
  const json = JSON.stringify({
    email: user.email,
    firstname: user.firstName,
    lastname: user.lastName,
    redirect_to: `aversis-${type}-license-${period}-days`,
  })

  const mc = new MCrypt('rijndael-256', 'ecb')
  mc.open(config.get('shop:secret'))

  return {
    url: `${config.get('shop:url')}gops/public?${mc.encrypt(json).toString('base64')}`,
  }
}
