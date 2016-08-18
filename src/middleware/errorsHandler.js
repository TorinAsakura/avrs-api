/* eslint-disable no-unused-vars */
import { lensPath, set } from 'ramda'
import ValidationError from '../errors/ValidationError'
import UnauthorizedError from '../errors/UnauthorizedError'

const formatError = (format, { message, ...values }) => ({
  message: format(message, values),
})

const formatErrors = (format, errors) =>
  errors.reduce((result, error) => set(lensPath(error.path), formatError(format, error), result), {})

export default function errorsHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(422).json(formatErrors(req.i18n.msgFormat, error.getErrors()))
  } else if (error instanceof UnauthorizedError) {
    res.status(401).json({})
  } else {
    res.status(500).send()
  }
}
