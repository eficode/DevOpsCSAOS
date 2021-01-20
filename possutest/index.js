const express = require('express')
const app = express()

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('database', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.get('/', (req, res) => {
  testDB()
  res.send('<h1>Hello world!</h1>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
