import Stat from '../models/stat'

export default async (sessionId, value) => {
  // check session opened
  await Stat.create({ sessionId, value })
}
