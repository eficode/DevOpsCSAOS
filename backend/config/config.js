require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASS } = process.env

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: 'dev_db',
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: 'test_db',
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  endtoend: {
    username: DB_USER,
    password: DB_PASS,
    database: 'endtoend_test_db',
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
}
