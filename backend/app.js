const express = require('express')
const path = require('path')
const { Category, Question, User } = require('./models')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend/out')))

// list all questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [{ model: Category, attributes: ['name'] }],
    })
    return res.json(questions)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Unable to fetch questions' })
  }
})

// list all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.findAll()
    return res.json(categories)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch answers' })
  }
})

// get question by id
app.get('/api/question/:uuid', async (req, res) => {
  const { uuid } = req.params
  try {
    const question = await Question.findOne({
      where: { uuid },
    })
    return res.json(question)
  } catch (e) {
    return res.status(500).send('That uuid does not exist')
  }
})

// get all questions in category
app.get('/api/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params
  try {
    const questions = await Question.findAll({
      where: { categoryId },
    })
    return res.json(questions)
  } catch (e) {
    return res.status(500).send('Failed to query database')
  }
})

// create user
app.post('/api/users', async (req, res) => {
  const { email, organizationId } = req.body
  try {
    const user = await User.create({ email, organizationId })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch users' })
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/out/index.html'))
})

module.exports = app
