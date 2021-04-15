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
  const { answers, surveyId, groupId } = req.body

  const survey = await Survey.findOne({
    where: { id: surveyId },
  })

  if (!survey) {
    return res.status(500).json('SurveyId is invalid')
  }

  let survey_user_group

  if (groupId) {
    survey_user_group = await Survey_user_group.findAll({
      where: { id: groupId },
      attributes: ['id'],
      plain: true,
    })

    if (!survey_user_group) {
      return res.status(400).json({
        message: 'GroupId is invalid.',
      })
    }
  }

  const verificationResult = await verifyUserAnswers(answers, surveyId)

  if (verificationResult.unAnsweredQuestionsFound) {
    return res.status(400).json({
      message: "Some questions don't have answers",
      questions: verificationResult.unAnsweredQuestions,
    })
  }

  if (verificationResult.duplicatesFound) {
    return res.status(400).json({
      message: 'Some questions are answered more than once',
      questions: verificationResult.duplicates,
    })
  }

  const results = await getSummaryOfResults(answers, surveyId)

  try {
    const userInDb = survey_user_group
      ? await User.create({
          groupId: survey_user_group.id,
        })
      : await User.create({})
    await saveAnswersToDatabase(answers, userInDb.id)
    const token = jwt.sign(userInDb.id, process.env.SECRET_FOR_TOKEN)

    return res.status(200).json({ token, results: results })
  } catch (err) {
    return res.status(500).json({
      message: 'Saving answers failed',
    })
  }
})

answersRouter.post('/emailsubmit', async (req, res) => {
  const { token, email, createNewGroup, surveyId } = req.body
  try {
    const userId = jwt.verify(token, process.env.SECRET_FOR_TOKEN)

    if (!email) {
      return res.status(500).json({
        message: 'Email required for submit',
      })
    }

    const validUser = await User.findOne({ where: { id: userId } })

    if (!validUser) {
      return res.status(401).json({
        message: 'No user associated with token.',
      })
    }
    if (createNewGroup) {
      const { dataValues: newGroup } = await Survey_user_group.create({
        surveyId: surveyId,
      })
      validUser.groupId = newGroup.id
    }
    await validUser.save()
    // send email to user here
    return res.status(200).json({})
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Updating user failed',
    })
  }
})

module.exports = answersRouter
