/* eslint-disable no-param-reassign */
import validator from '../validation/validator'

export default () => {
  return (req, res, next) => {
    req.validate = validator(req.i18n)

    next()
  }
}
