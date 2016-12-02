export default async function unique(value, options = {}, key) {
  if (!value) {
    return null
  }

  const user = await options.model.findOne({ where: { [key]: value } })

  if (user) {
    return 'already exists.'
  }

  return null
}
