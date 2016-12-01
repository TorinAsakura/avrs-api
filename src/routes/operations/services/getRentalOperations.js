import RentalOperation from '../models/RentalOperation'

export default async (userId) => {
  return await RentalOperation.findAll({ where: { userId } })
}
