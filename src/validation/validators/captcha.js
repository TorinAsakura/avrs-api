import https from 'https'
import config from '../../config'

const post = (options, query) =>
  new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let body = ''

      response.setEncoding('utf8')
      response.on('data', (chunk) => { body += chunk })

      response.on('end', () => {
        const result = JSON.parse(body)

        if (result.success) {
          resolve()
        } else {
          const errors = result['error-codes'] && result['error-codes'].length > 0
            ? result['error-codes'][0]
            : 'invalid-input-response'

          reject(errors)
        }
      })

      response.on('error', error => reject(error))
    })

    request.write(query)
    request.end()
  })

export default async function exists(value) {
  if (!value) {
    return '^This value is required'
  }

  const query = `secret=${config.get('recaptcha:secretKey')}&response=${value}`

  const params = {
    host: 'www.google.com',
    port: '443',
    path: '/recaptcha/api/siteverify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(query),
    },
  }

  try {
    await post(params, query)

    return null
  } catch (error) {
    return '^This value is invalid'
  }
}
