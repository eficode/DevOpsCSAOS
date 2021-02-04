const answersRouter = require('express').Router()
const { User, Answer, Question } = require('../models')

answersRouter.post('/', async (req, res) => {
  const { email, answers } = req.body
  const allQuestions = await Question.findAll()
  const results = []
  let maxResult = 0
  let userResult = 0
  if (email !== null) {
    try {
      const user = await User.create({ email })
      

      await answers.map(async (answer) => {
        const { dataValues: newAnswer } = await Answer.create({
          userId: user.id,
          questionId: answer.questionId,
          value: answer.value,
        })
        const { dataValues: question } = allQuestions.find(
          (quest) => quest.id === newAnswer.questionId
        )
        
        userResult += question.weight * newAnswer.value
        console.log(userResult)
        maxResult += question.weight * 5
        const answerResult = question.weight * newAnswer.value

        results.push(answerResult)
      })


      return res.status(200).json({ result: `${userResult}/${maxResult}` })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
  return res.status(200)
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
