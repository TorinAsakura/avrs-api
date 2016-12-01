function NotFoundError(message = 'Not found') {
  Error.call(this, message)
  Error.captureStackTrace(this, this.constructor)

  this.name = 'NotFoundError'
  this.message = message
}

NotFoundError.prototype = Object.create(Error.prototype)
NotFoundError.prototype.constructor = NotFoundError

NotFoundError.prototype.getErrors = function getErrors() {
  return {}
}

export default NotFoundError
