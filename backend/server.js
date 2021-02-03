/* eslint-disable prettier/prettier */
const app = require('./app')

const { initDatabase } = require('./config/setupDatabase')

const port = process.env.PORT || 5000
app.listen({ port }, async () => {
  await initDatabase()
  console.log('database initialized')
  console.log(`'Server up on http://localhost:${port}`)
})
