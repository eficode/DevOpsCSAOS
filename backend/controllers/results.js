const resultsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { getFullResults } = require('./helpers/answers')
const { User, User_answer, Question, Question_answer } = require('../models')
const getGroupAverage = require('./helpers/userGroupAverage')
const getIndustryAverage = require('./helpers/industryAverage')
const findUserLatestAnswerIds = require('./helpers/findUserLatestAnswerIds')

const getUserIdFromToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_FOR_TOKEN)
  } catch (e) {
    return null
  }
}

resultsRouter.get('/:token', async (req, res) => {
  const { token } = req.params

  const userId = getUserIdFromToken(token)
  if (!userId) {
    return res.status(401).json({ message: 'invalid token' })
  }

  const user = await User.findOne({
    include: [
      {
        model: User_answer,
        include: [
          {
            model: Question_answer,
            include: [
              {
                model: Question,
                attributes: ['surveyId'],
              },
            ],
          },
        ],
      },
    ],
    where: {
      id: userId,
    },
  })

  if (!user) {
    return res.status(401).json({ message: 'No user associated with token' })
  }
  const { groupId, industryId } = user.dataValues
  const { surveyId } = user.User_answers[0].Question_answer.Question
  if (!surveyId) {
    return res.status(401).json({ message: 'invalid survey information' })
  }

  const usersNewestAnswers = await findUserLatestAnswerIds(userId)

  let fullResults = await getFullResults(usersNewestAnswers, surveyId)

  if (groupId) {
    const groupAveragesByCategory = await getGroupAverage(groupId, surveyId)
    fullResults = {
      ...fullResults,
      categoryResults: fullResults.categoryResults.map((c, index) => ({
        groupAverage: groupAveragesByCategory[index].groupAverage,
        ...c,
      })),
    }
  }

  if (industryId) {
    const industryAveragesByCategory = await getIndustryAverage(
      industryId,
      surveyId
    )
    fullResults = {
      ...fullResults,
      categoryResults: fullResults.categoryResults.map((c, index) => ({
        industryAverage: industryAveragesByCategory[index].industryAverage,
        ...c,
      })),
    }
  }
  return res.status(200).json(fullResults)
})

module.exports = resultsRouter
