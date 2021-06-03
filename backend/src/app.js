const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

const userGroupRouter = require('./controllers/userGroups')
const questionsRouter = require('./controllers/questions')
const usersRouter = require('./controllers/users')
const answersRouter = require('./controllers/answers')
const industryRouter = require('./controllers/industry')
const resultsRouter = require('./controllers/results')

app.use('/api/user-groups', userGroupRouter)
app.use('/api/questions', questionsRouter)
app.use('/api/users', usersRouter)
app.use('/api/answers', answersRouter)
app.use('/api/industries', industryRouter)
app.use('/api/results', resultsRouter)

if (process.env.NODE_ENV === 'production') {
  // serve the frontend static build
  app.use(express.static(path.join(__dirname, '../frontend/out')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/out/index.html'))
  })
}

module.exports = app
