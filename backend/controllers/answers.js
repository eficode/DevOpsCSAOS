const jwt = require('jsonwebtoken')
const answersRouter = require('express').Router()
const { User, User_answer, Survey, Survey_user_group } = require('../models')

const { verifyUserAnswers, getSummaryOfResults } = require('./helpers/answers')

const saveAnswersToDatabase = async (answers, userId) => {
  const answersToQuestions = answers.map((answer) => ({
    userId,
    questionAnswerId: answer,
  }))

  await User_answer.bulkCreate(answersToQuestions)
}

answersRouter.post('/', async (req, res) => {
  const { email, answers, surveyId, groupId } = req.body

  const survey = await Survey.findOne({
    where: { id: surveyId },
  })

  if (!survey) {
    return res.status(500).json('SurveyId is invalid')
  }

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
    let userInDb
    if (email) {
      userInDb = survey_user_group
        ? await User.findOne({
            where: { email, groupId: survey_user_group.id },
          })
        : await User.findOne({
            where: { email },
          })

      // if user with email and user group exists no new user is created, otherwise new user is created
      if (!userInDb) {
        userInDb = survey_user_group
          ? await User.create({
              where: { email, groupId: survey_user_group.id },
            })
          : (userInDb = await User.create({
              email,
            }))
      }
    } else {
      // if anonymous user submits anwers with group id, id is saved to db
      userInDb = survey_user_group
        ? await User.create({
            groupId: survey_user_group.id,
          })
        : await User.create({})
    }

    await saveAnswersToDatabase(answers, userInDb.id)
    const token = jwt.sign(userInDb.id, process.env.SECRET_FOR_TOKEN)

    return res.status(200).json({ token, results: results })
  } catch (err) {
    return res.status(500).json({
      message: 'Saving answers failed',
    })
  }
})

module.exports = answersRouter
