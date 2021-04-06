const answersRouter = require('express').Router()
const { User, User_answer, Survey } = require('../models')

const {
  verifyUserAnswers,
  deleteUserSurveyAnswers,
  getResults,
} = require('./helpers/answers')

const saveAnswersToDatabase = async (answers, userId) => {
  const answersToQuestions = answers.map((answer) => ({
    userId,
    questionAnswerId: answer,
  }))

  await User_answer.bulkCreate(answersToQuestions)
}

answersRouter.post('/', async (req, res) => {
  const { email, answers, surveyId } = req.body

  const survey = await Survey.findAll({
    where: { id: surveyId },
  })

  if (!survey) {
    return res.status(500).json('SurveyId is invalid')
  }

  const verificationResult = await verifyUserAnswers(answers, surveyId)

  if (verificationResult.unAnsweredQuestionsFound) {
    return res.status(500).json({
      message: "Some questions don't have answers",
      questions: verificationResult.unAnsweredQuestions,
    })
  }

  if (verificationResult.duplicatesFound) {
    return res.status(500).json({
      message: 'Some questions are answered more than once',
      questions: verificationResult.duplicates,
    })
  }
  const results = await getResults(answers, surveyId)

  try {
    if (email) {
      let userInDb = await User.findOne({
        where: { email },
      })

      if (userInDb) {
        await deleteUserSurveyAnswers(userInDb.id, surveyId)
      } else {
        userInDb = await User.create({ email })
      }

      await saveAnswersToDatabase(answers, userInDb.id)
    }
    return res.status(200).json({ results: results })
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = answersRouter
