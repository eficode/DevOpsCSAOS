const jwt = require('jsonwebtoken')
const answersRouter = require('express').Router()
const {
  User,
  User_answer,
  Survey,
  Survey_user_group,
  Industry,
} = require('../../models')
const { SendHubspotMessage } = require('./helpers/sendAnswersToHubspot')
const { verifyUserAnswers, getFullResults } = require('./helpers/answers')
const getIndustryAverage = require('./helpers/industryAverage')

const saveAnswersToDatabase = async (answers, userId) => {
  const answersToQuestions = answers.map((answer) => ({
    userId,
    questionAnswerId: answer,
  }))

  await User_answer.bulkCreate(answersToQuestions)
}

answersRouter.post('/', async (req, res) => {
  const { answers, surveyId, groupId, industryId } = req.body
  const survey = await Survey.findOne({
    where: { id: surveyId },
  })

  if (!survey) {
    return res.status(400).json('SurveyId is invalid')
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

  let results = await getFullResults(answers, surveyId)
  let userInDb
  try {
    userInDb = survey_user_group
      ? await User.create({
          groupId: survey_user_group.id,
        })
      : await User.create({ industryId: industryId || null })
    await saveAnswersToDatabase(answers, userInDb.id)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Saving user failed',
    })
  }

  if (industryId) {
    const industryAveragesByCategory = await getIndustryAverage(
      industryId,
      surveyId
    )
    results = {
      ...results,
      categoryResults: results.categoryResults.map((c, index) => ({
        industryAverage: industryAveragesByCategory[index].industryAverage,
        ...c,
      })),
    }
  }

  // console.log('results', results)
  // console.log('newResults', newResults)

  try {
    const token = jwt.sign(userInDb.id, process.env.SECRET_FOR_TOKEN)
    return res.status(200).json({ token, results: results })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Transforming to token failed',
    })
  }
})

const findUserMatchingTokenFromDb = async (token) => {
  const anonymousUserId = jwt.verify(token, process.env.SECRET_FOR_TOKEN)
  return User.findOne({
    where: {
      id: anonymousUserId,
    },
  })
}

answersRouter.post('/emailsubmit', async (req, res) => {
  const {
    token,
    email,
    createNewGroup,
    groupId,
    industryId,
    userQuestionAnswerPairs,
    userRole,
    userChallenge,
    surveyId
  } = req.body

  try {
    // request body validation

    if (!email || !token || !surveyId) {
      return res.status(400).json({
        message: 'Email, token and survey id are required for submit',
      })
    }

    if (!userRole) {
      return res.status(400).json({
        message: 'User role is required',
      })
    }

    if (!userChallenge) {
      return res.status(400).json({
        message: 'Challenge selection is required',
      })
    }

    let user = await findUserMatchingTokenFromDb(token)
    if (!user) {
      return res.status(401).json({
        message: 'No user associated with token.',
      })
    }
    let userToken = token
    // update users table in db
    const userInDb = await User.findOne({
      where: {
        email: email,
        groupId: groupId || null,
      },
    })

    if (userInDb) {
      // associate new answers with existing user
      await User_answer.update(
        { userId: userInDb.id },
        { where: { userId: user.id } }
      )
      userToken = jwt.sign(userInDb.id, process.env.SECRET_FOR_TOKEN)
      await User.destroy({ where: { id: user.id } })
      user = userInDb
    } else {
      user.email = email
      await user.save()
    }

    let createdGroupId
    // update user groups in db
    if (createNewGroup && !groupId) {
      const { dataValues: newGroup } = await Survey_user_group.create({
        surveyId: surveyId,
      })
      createdGroupId = newGroup.id
      user.groupId = createdGroupId
      await user.save()
    }

    // update industry
    if (industryId) {
      const industryInDb = await Industry.findOne({ where: { id: industryId } })
      if (!industryInDb) {
        return res.status(400).json({
          message: 'Invalid industry id',
        })
      }

      user.industryId = industryId
      await user.save()
    }

    if (process.env.NODE_ENV === 'production') {
      try {
        const baseURL = process.env.BASE_URL_FOR_EMAILS
        const group_parameter = groupId || createdGroupId
        const user_parameter = userToken
        const group_invite_link = group_parameter
          ? `${baseURL}/?groupid=${group_parameter}`
          : ''
        const user_results_link = user_parameter
          ? `${baseURL}/?user=${user_parameter}`
          : ''
        await SendHubspotMessage(
          email,
          group_invite_link,
          user_results_link,
          userQuestionAnswerPairs,
          userRole,
          userChallenge
        )
      } catch (error) {
        console.log("Failed to sends data to hubspot")
        return res.status(500).json({
          message: 'Sending data to hubspot failed.',
        })
      }
    }

    return res.status(200).json({})
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Updating user failed',
    })
  }
})

module.exports = answersRouter
