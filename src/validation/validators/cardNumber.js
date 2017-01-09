import cardNumber from 'card-validator/src/card-number'

export default function (value) {
  if (!(value && value.length > 0)) {
    return null
  }

  if (!cardNumber(value).isValid) {
    return '^Invalid card number.'
  }

  return null
}
