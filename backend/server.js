/* eslint-disable prettier/prettier */
const app = require('./app')

const { PORT, NODE_ENV } = process.env

const { initDatabase } = require('./config/setupDatabase')

const port = NODE_ENV === 'test' ? 5001 : 
  PORT || 5000

app.listen({ port }, async () => {
  if (NODE_ENV !== 'test'){
    await initDatabase()
  }
  
  console.log('database initialized')
  console.log(`'Server up on http://localhost:${port}`)
})
