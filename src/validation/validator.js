import moment from 'moment'
import validator from 'validate.js'
import password from './validators/password'
import unique from './validators/unique'
import exists from './validators/exists'
import phone from './validators/phone'
import captcha from './validators/captcha'
import cardNumber from './validators/cardNumber'
import walletAddress from './validators/walletAddress'
import ValidationErrors from '../errors/ValidationErrors'

validator.validators.password = password
validator.validators.unique = unique
validator.validators.exists = exists
validator.validators.phone = phone
validator.validators.captcha = captcha
validator.validators.cardNumber = cardNumber
validator.validators.walletAddress = walletAddress

validator.extend(validator.validators.datetime, {
  parse: value => moment.utc(value),
  format: (value, options) => moment.utc(value).format(options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'),
})

export const validate = async (constraints = [], value, options = { format: 'detailed' }) => {
  try {
    return await Promise.all(constraints.map(item => validator.async(value, item, options)))
  } catch (errors) {
    throw new ValidationErrors(errors)
  }
}

export default (i18n) => {
  return async (constraints = [], value) => {
    try {
      await validate(constraints, value)
    } catch (errors) {
      return errors.getErrors().map(({ attribute, error, ...values }) => ({
        key: attribute.split('.'),
        message: i18n.formatMessage(error, values),
      }))
    }

    return null
  }
}
