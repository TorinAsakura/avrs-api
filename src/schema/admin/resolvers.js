import * as queries from './queries'
import * as mutations from './mutations'

const resolverMap = {
  User: {
    activations(user) {
      return user.Activations.filter(activation => !activation.isExpired())
    },
    referals(user) {
      return user.referals()
    },
  },
  RootQuery: queries,
  RootMutation: mutations,
}

export default resolverMap
