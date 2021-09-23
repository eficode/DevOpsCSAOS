const _ = require('lodash')
const { User, Survey_user_group, Industry } = require('../../../models')
const { getFullResults } = require('./getResults')

const findUserLatestAnswersIds = require('./findUserLatestAnswerIds')

const getIndustryAverage = async (industryId, surveyId) => {
  const usersInIndustry = await (
    await User.findAll({
      include: [
        {
          model: Industry,
        },
        {
          model: Survey_user_group,
        },
      ],
      where: {
        industryId: industryId,
      },
      nest: true,
    })
  ).map((el) => el.get({ plain: true }))

  const usersInIndustryResults = await Promise.all(
    usersInIndustry.map(async (user) => {
      const userLatestAnswersIds = await findUserLatestAnswersIds(user.id)

      const detailedUserResults = await getFullResults(
        userLatestAnswersIds,
        surveyId
      )

      return {
        userId: user.id,
        results: detailedUserResults,
      }
    })
  )

  const categories = usersInIndustryResults[0].results.categoryResults

  categories.forEach((category, index) => {
    const averageInCategory = _.meanBy(
      usersInIndustryResults,
      (u) => u.results.categoryResults[index].userPoints
    )
    categories[index].industryAverage = averageInCategory
  })
  const mappedCategories = categories.map((c) => ({
    name: c.name,
    industryAverage: c.industryAverage,
  }))

  return mappedCategories
}

module.exports = getIndustryAverage
