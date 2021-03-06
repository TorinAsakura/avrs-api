import moment from 'moment'
import * as queries from './queries'
import * as mutations from './mutations'

const resolverMap = {
  User: {
    schedule(user) {
      return user.schedule
    },
    activations(user) {
      return user.Activations.filter(activation => !activation.isExpired())
    },
    plan(user) {
      const [activation] = user.Activations.filter(({ startAt, expireAt }) => moment().isBetween(startAt, expireAt))

      return activation ? activation.servicePlan : null
    },
    referals(user) {
      return user.referals()
    },
    sponsor(user) {
      return user.sponsor()
    },
  },
  RootQuery: queries,
  RootMutation: mutations,
}

export default resolverMap
