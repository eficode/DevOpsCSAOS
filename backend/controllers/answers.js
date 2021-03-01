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
    if (email) {
      let userId
      const existingUser = await User.findOne({
        where: { email },
      })

      if (existingUser) {
        userId = existingUser.id
      } else {
        const user = await User.create({ email })
        userId = user.id
      }

      const answersToQuestions = answers.map((answer) => ({
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...answer,
        userId,
      }))

      if (!existingUser) {
        await Answer.bulkCreate(answersToQuestions)
      } else {
        answersToQuestions.forEach(answer =>
           Answer.update(
            { value: answer.value },
            { where: { questionId: answer.questionId, userId: answer.userId } }
        )) 
      }
    }

    userResult = await resultsPerCategory(allCategories, allQuestions, answers)
    return res.status(200).json({ results: userResult })
  } catch (err) {
    console.log(err)
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
