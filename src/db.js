import Sequelize from 'sequelize'
import config from './config'

const { database, username, password, host, dialect } = config.get('db')

const sequelize = new Sequelize(database, username, password, { host, dialect })

export default sequelize
