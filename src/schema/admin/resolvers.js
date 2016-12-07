import moment from 'moment'
import * as queries from './queries'
import * as mutations from './mutations'

const resolverMap = {
  User: {
    activations(user) {
      return user.Activations.filter(({ expireAt }) => moment().isBefore(expireAt))
    },
    referals(user) {
      return user.referals()
    },
  },
  RootQuery: queries,
  RootMutation: mutations,
}

export default resolverMap
