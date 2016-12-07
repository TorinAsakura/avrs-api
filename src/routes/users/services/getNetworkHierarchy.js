import User from '../models/user'

export default async (user) => {
  const referals = await User.findAll({
    where: {
      networkPath: {
        $contains: user.networkPath,
      },
    },
  })

  const grouped = referals.reduce((result, referal) => {
    const path = JSON.stringify(referal.parentNetworkPath)

    if (!result[path]) {
      result[path] = []
    }

    result[path].push(referal)

    return result
  }, {})

  const getChildren = (groups, node) => {
    const path = JSON.stringify(node.networkPath)

    return {
      id: node.id,
      firstName: node.firstName,
      lastName: node.lastName,
      children: (groups[path] || []).map(child => getChildren(groups, child)),
    }
  }

  return referals.reduce((result, referal) => {
    if (JSON.stringify(referal.parentNetworkPath) === JSON.stringify(user.networkPath)) {
      result.push(getChildren(grouped, referal))
    }

    return result
  }, [])
}
