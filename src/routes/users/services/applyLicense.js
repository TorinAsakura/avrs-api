import https from 'https'
import db from '../../../db'
import config from '../../../config'
import User from '../models/user'
import Activation from '../models/activation'

const post = (options, query) =>
  new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let body = ''

      response.setEncoding('utf8')
      response.on('data', (chunk) => { body += chunk })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', error => reject(error))
    })

    request.write(query)
    request.end()
  })

const loadLicenseData = async (license) => {
  const params = {
    host: 'www.aversis-shop.com',
    port: '443',
    path: '/gops/public/check.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const content = JSON.stringify({ key: license })

  try {
    const response = await post(params, content)

    const { product_id: productId } = JSON.parse(response)

    return productId
  } catch (error) {
    return null
  }
}

export default async (user, license) => {
  Activation.belongsTo(User)

  const productId = await loadLicenseData(license)

  if (!productId) {
    throw Error('License not found')
  }

  if (await Activation.findOne({ where: { license } })) {
    throw Error('License allready exists')
  }

  const [servicePlan] = config.get('servicePlans').filter(plan => plan.productId === productId)

  if (!servicePlan) {
    throw Error('Unknown license')
  }

  const activation = await Activation.create({ license, servicePlan, userId: user.id })

  if (user.status === 'NEW') {
    user.status = 'ACTIVE'
    await user.save()
  }

  await db.transaction(transaction =>
    Promise.all(
      user.networkPath.map(id =>
        User.update(
          { salesBalance: db.literal(`"salesBalance" + ${activation.servicePlan.price}`) },
          { where: { id } },
          { transaction },
        ),
      ),
    ),
  )

  return activation
}
