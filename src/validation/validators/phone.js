import { isValidNumber } from 'libphonenumber-js'

export default function (value) {
  if (!isValidNumber(value)) {
    return '^Invalid phone number.'
  }

  return null
}
