import * as queries from './queries'
import * as mutations from './mutations'

const resolverMap = {
  RootQuery: queries,
  RootMutation: mutations,
}

export default resolverMap
