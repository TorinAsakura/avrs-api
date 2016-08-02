/* eslint-disable no-unused-vars */
import ValidationError from '../errors/ValidationError'
import UnauthorizedError from '../errors/UnauthorizedError'

export default function errorsHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(422).json(error.toJSON())
  } else if (error instanceof UnauthorizedError) {
    res.status(401).json({})
  } else {
    res.status(500).send()
  }
}
