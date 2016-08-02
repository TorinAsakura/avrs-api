function UnauthorizedError(message = 'Unauthorized') {
  Error.call(this, message)
  Error.captureStackTrace(this, this.constructor)

  this.name = 'UnauthorizedError'
  this.message = message
  this.code = 401
  this.status = 401
}

UnauthorizedError.prototype = Object.create(Error.prototype)
UnauthorizedError.prototype.constructor = UnauthorizedError

export default UnauthorizedError
