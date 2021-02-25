/* eslint-disable prettier/prettier */
const answersRouter = require('express').Router()
const { User, Answer, Question, Category } = require('../models')
const { resultsPerCategory } = require('../helpers/answerResults')
const answer = require('../models/answer')

answersRouter.post('/', async (req, res) => {
  const { email, answers } = req.body
  const allQuestions = await Question.findAll({ raw: true })
  const allCategories = await Category.findAll({ raw: true })

  let userResult

  try {
    if (email !== undefined) {
      let userId = -1
      const existingUser = await User.findOne({
        where: { email: email },
      })

      if (existingUser !== null) {
        userId = existingUser.id
      } else {
        const user = await User.create({ email })
        userId = user.id
      }

      const answersToQuestions = answers.map((answer) => ({
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...answer,
        userId: userId,
      }))

      if (existingUser === null) {
        await Answer.bulkCreate(answersToQuestions)
      } else {
        answersToQuestions.forEach(async answer =>
          await Answer.update(
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
