const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend/out')))

const questionRouter = require('./controllers/questions')
const categoriesRouter = require('./controllers/categories')
const usersRouter = require('./controllers/users')

app.use('/api/questions', questionRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'))
})

module.exports = app
