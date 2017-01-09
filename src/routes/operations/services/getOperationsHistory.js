import Operation from '../models/Operation'

export default async (userId) => {
  return await Operation.findAll({ where: { userId } })
}
