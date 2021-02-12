/* eslint-disable prettier/prettier */
const answersRouter = require('express').Router()
const { User, Answer, Question, Category } = require('../models')
const { resultsPerCategory } = require('../helpers/answerResults')

answersRouter.post('/', async (req, res) => {
  const { email, answers } = req.body
  const allQuestions = await Question.findAll({ raw: true })
  const allCategories = await Category.findAll({ raw: true })

  let userResult

    try {

      if(email !== undefined) {
        const user = await User.create({ email })
        const answersToQuestions = answers.map((answer) => ({
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
          ...answer,
          userId: user.id,
        }))

        await Answer.bulkCreate(answersToQuestions)
      }
      
      userResult = await resultsPerCategory(
        allCategories,
        allQuestions,
        answers
      )
      return res.status(200).json({ results: userResult })
    } catch (err) {
      return res.status(500).json(err)
    }
  
})

answersRouter.get('/', async (req, res) => {
  try {
    const answers = await Answer.findAll()
    return res.json(answers)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch answers' })
  }
})

module.exports = answersRouter
