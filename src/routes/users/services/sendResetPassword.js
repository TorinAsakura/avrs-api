import { randomString } from 'crypto-extra'
import User from '../models/user'
import mailer from '../../../mailer'

export default async function sendResetPassword({ email, resetUrl }) {
  const user = await User.findOne({ where: { email } })

  const resetToken = randomString(48)
  const url = `${resetUrl}${resetToken}`

  user.resetToken = resetToken

  await user.save()
  await mailer('resetPassword', email, { url })
}
