/* eslint-disable prettier/prettier */
const app = require('./app')
const {
  sequelize,
} = require('./models')
const { PORT, NODE_ENV } = process.env

const { initDatabase } = require('./config/setupDatabase')

const port = NODE_ENV === 'endtoend' ? 5001 : 
  PORT || 5000

app.listen({ port }, async () => {
  if (NODE_ENV ==='endtoend'){
    // create all database tables
    await sequelize.sync({ force: true })
  } else {
    await initDatabase()
    console.log('database initialized')
  }
  
  
  console.log(`'Server up on http://localhost:${port}`)
})
