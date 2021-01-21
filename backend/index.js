const express = require('express')
const app = express()

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('database', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const Hello = sequelize.define('Hello', {
  message: {
    type: DataTypes.STRING,
  }
});

const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testDB()

const createTables = async () => {
  await Hello.sync({ alter: true })
  /*
    This checks what is the current state of the table in the database
   (which columns it has, what are their data types, etc), and then
    performs the necessary changes in the table to make it match 
    the model.
  */
 console.log('Table Hello created')
}
createTables()

app.post('/hello', async (req, res) => {
  const message = Hello.build({message: 'Hello postgres!'})
  await message.save()
  res.status(200).end()
})

app.get('/hello', async (req, res) => {
  const dataInDb = await Hello.findAll()
  
  if (dataInDb.length > 1) {
    const message = dataInDb[0].dataValues.message
    res.send(message)
  } else {
    res.send('no data in db, POST to /hello to insert data')
  }
})

app.get('/', (req, res) => {
  const msg =
  'usage: POST to /hello to insert message "Hello postgres!" to db,' +
  ' GET /hello to fetch message' 
  res.send(msg)
})

const PORT = process.env.NODE_ENV === 'test' ? 3002 : 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
