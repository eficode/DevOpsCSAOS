const answersRouter = require('express').Router()
const { User, User_answer, Survey, Survey_user_group } = require('../models')

const {
  verifyUserAnswers,
  deleteUserSurveyAnswers,
  getSummaryOfResults,
} = require('./helpers/answers')

const saveAnswersToDatabase = async (answers, userId) => {
  const answersToQuestions = answers.map((answer) => ({
    userId,
    questionAnswerId: answer,
  }))

  await User_answer.bulkCreate(answersToQuestions)
}

answersRouter.post('/', async (req, res) => {
  const { email, answers, surveyId, groupId } = req.body

  const survey = await Survey.findAll({
    where: { id: surveyId },
  })
  let survey_user_group

  if (groupId) {
    survey_user_group = await Survey_user_group.findAll({
      where: { url: groupId },
      attributes: ['id'],
      plain: true,
    })

    if (!survey_user_group) {
      return res.status(500).json({
        message: 'GroupId is invalid.',
      })
    }
  }

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

  const results = await getSummaryOfResults(answers, surveyId)

  try {
    if (email) {
      // if user has answered with the same email + groupId combination previous answers get deleted.
      let userInDb = await User.findOne({
        where: { email, groupId: survey_user_group.id },
      })

      if (userInDb) {
        await deleteUserSurveyAnswers(userInDb.id, surveyId)
      } else {
        userInDb = await User.create({ email, groupId: survey_user_group.id })
      }

      await saveAnswersToDatabase(answers, userInDb.id)
    } else {
      const userInDb = await User.create({
        email: email || null,
        groupId: survey_user_group.id || null,
      })
      await saveAnswersToDatabase(answers, userInDb.id)
    }
    return res.status(200).json({ results: results })
  } catch (err) {
    return res.status(500).json({
      message: 'Saving answers failed',
    })
  }
})

module.exports = answersRouter
