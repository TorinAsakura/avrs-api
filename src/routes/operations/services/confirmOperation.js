import Operation from '../models/Operation'

export default async (id) => {
  const operation = await Operation.findById(id)

  await operation.update({ status: 'PERFORMED' })

  return operation
}
