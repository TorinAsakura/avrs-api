import mailer from '../../../mailer'

export default async function sendActivation(user, activateUrl) {
  const { email, activateToken, ...data } = user.toJSON()
  const url = `${activateUrl}${activateToken}`

  await mailer('registration', email, { url, ...data })
}
