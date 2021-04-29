const resultsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { getFullResults } = require('./helpers/answers')
const {
  Survey_user_group,
  User,
  User_answer,
  Question,
  Question_answer,
  sequelize,
} = require('../models')
const getGroupAverage = require('./helpers/userGroupAverage')
const getIndustryAverage = require('./helpers/industryAverage')
const findUserLatestAnswerIds = require('./helpers/findUserLatestAnswerIds')

resultsRouter.get('/:token', async (req, res) => {
  const { token } = req.params
  const userId = jwt.verify(token, process.env.SECRET_FOR_TOKEN)

  const { dataValues: user } = await User.findOne({
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
  const { groupId, industryId } = user
  const { surveyId } = user.User_answers[0].Question_answer.Question
  const usersNewestAnswers = await findUserLatestAnswerIds(userId)

  let fullResults = await getFullResults(usersNewestAnswers, surveyId)

  if (groupId) {
    const groupAveragesByCategory = await getGroupAverage(groupId)
    fullResults = {
      ...fullResults,
      categoryResults: fullResults.categoryResults.map((c, index) => ({
        groupAverage: groupAveragesByCategory[index].groupAverage,
        ...c,
      })),
    }
  }

  if (industryId) {
    const industryAveragesByCategory = await getIndustryAverage(industryId)
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
