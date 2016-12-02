/* eslint-disable no-unused-vars */
import ValidationErrors from '../errors/ValidationErrors'
import UnauthorizedError from '../errors/UnauthorizedError'
import NotFoundError from '../errors/NotFoundError'
import logger from '../logger'

export default function errorsHandler(error, req, res, next) {
  if (error instanceof ValidationErrors) {
    res.status(422).json(error.getErrors())
  } else if (error instanceof UnauthorizedError) {
    res.status(401).json({})
  } else if (error instanceof NotFoundError) {
    res.status(404).json({ message: req.i18n.formatMessage(error.message) })
  } else {
    logger.error(error)
    res.status(500).send()
  }
}
