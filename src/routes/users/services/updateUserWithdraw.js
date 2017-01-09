import { validate } from '../../../validation/validator'
import updateWithdrawInformation from '../constraints/updateWithdrawInformation'
import User from '../models/user'

export default async (id, { cardNumber, btcAddress }) => {
  await validate([updateWithdrawInformation], { cardNumber, btcAddress })

  const user = await User.findOne({ where: { id } })

  const params = {}

  if (cardNumber && cardNumber.length > 0) {
    params.cardNumber = cardNumber
  } else if (user.cardNumber) {
    params.cardNumber = null
  }

  if (btcAddress && btcAddress.length > 0) {
    params.btcAddress = btcAddress
  } else if (user.btcAddress) {
    params.btcAddress = null
  }

  await user.update(params)

  return user
}
