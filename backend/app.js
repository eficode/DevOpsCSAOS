const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend/out')))

const userGroupRouter = require('./controllers/userGroups')
const questionsRouter = require('./controllers/questions')
const usersRouter = require('./controllers/users')
const answersRouter = require('./controllers/answers')
const industryRouter = require('./controllers/industry')

app.use('/api/user-groups', userGroupRouter)
app.use('/api/questions', questionsRouter)
app.use('/api/users', usersRouter)
app.use('/api/answers', answersRouter)
app.use('/api/industries', industryRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'))
})

module.exports = app
