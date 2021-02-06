const answersRouter = require('express').Router()
const { User, Answer, Question } = require('../models')

answersRouter.post('/', async (req, res) => {
  const { email, answers } = req.body
  const allQuestions = await Question.findAll()

  let maxResult = 0
  let userResult = 0

  if (email !== undefined) {
    try {
      const user = await User.create({ email })
      const answersToQuestions = answers.map((answer) => ({
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...answer,
        userId: user.id,
      }))

      await Answer.bulkCreate(answersToQuestions)

      await answers.forEach((answer) => {
        const { dataValues: question } = allQuestions.find(
          (quest) => quest.id === answer.questionId
        )
        userResult += question.weight * answer.value
        maxResult += question.weight * 5
      })

      return res.status(200).json({ result: `${userResult}/${maxResult}` })
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    try {
      await answers.forEach((answer) => {
        const { dataValues: question } = allQuestions.find(
          (quest) => quest.id === answer.questionId
        )
        userResult += question.weight * answer.value
        maxResult += question.weight * 5
      })

      return res.status(200).json({ result: `${userResult}/${maxResult}` })
    } catch (err) {
      return res.status(500).json(err)
    }
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
