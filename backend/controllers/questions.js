const questionsRouter = require('express').Router()
const { Category, Question } = require('../models')

questionsRouter.get('/', async (req, res) => {
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

questionsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const question = await Question.findOne({
      where: { id },
    })
    return res.json(question)
  } catch (e) {
    return res.status(500).send('That uuid does not exist')
  }
})

module.exports = questionsRouter
