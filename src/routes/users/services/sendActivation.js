import { randomString } from 'crypto-extra'
import mailer from '../../../mailer'

export default async function sendActivation(user, activateUrl) {
  const activateToken = randomString(48)

  await user.update({ activateToken })

  const { email, ...data } = user.toJSON()
  const url = `${activateUrl}${activateToken}`

  await mailer('registration', email, { url, ...data })
}
