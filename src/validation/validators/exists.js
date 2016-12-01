export default async function exists(value, options = {}, key) {
  if (!value) {
    return null
  }

  const user = await options.model.findOne({ where: { [key]: value } })

  if (!user) {
    return 'does not exists.'
  }

  return null
}
