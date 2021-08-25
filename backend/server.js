/* eslint-disable prettier/prettier */
const assert = require('assert')
const app = require('./src/app')
const { sequelize } = require('./models')

const { PORT, NODE_ENV } = process.env
assert(PORT)
console.log(PORT)

const { initDatabase } = require('./config/setupDatabase')
const { updateHubspotProperties } = require('./src/controllers/helpers/updateHubspotProperties')

const port = PORT
app.listen(port, async () => {
  if (NODE_ENV === 'endtoend') {
    // create all database tables
    await sequelize.sync({ force: true })
  } else {
    await initDatabase()
    console.log('database initialized')
  }

  if (NODE_ENV === 'production') {
    await updateHubspotProperties()
  }

  console.log(`'Server up on http://localhost:${PORT}`)
})
