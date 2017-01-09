import WAValidator from 'wallet-address-validator'

export default function (value) {
  if (!(value && value.length > 0)) {
    return null
  }

  if (!WAValidator.validate(value)) {
    return '^Invalid wallet address.'
  }

  return null
}
