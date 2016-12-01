import ReferalOperation from '../models/ReferalOperation'

export default async (userId) => {
  return await ReferalOperation.findAll({ where: { userId } })
}
