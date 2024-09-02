import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()