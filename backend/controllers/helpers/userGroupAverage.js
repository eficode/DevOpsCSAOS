//helper for group average
const { User, Survey_user_group } = require('../../models')
const { getFullResults } = require('./getResults')
const _ = require('lodash')

const findUserLatestAnswersIds = require('./findUserLatestAnswerIds')

const getGroupAverage = async (groupid) => {
  const usersInGroup = await (
    await User.findAll({
      include: [
        {
          model: Survey_user_group,
        },
      ],
      where: {
        groupId: groupid,
      },
      nest: true,
    })
  ).map((el) => el.get({ plain: true }))

  const usersInGroupResults = await Promise.all(
    usersInGroup.map(async (user) => {
      const userLatestAnswersIds = await findUserLatestAnswersIds(user.id)

      const detailedUserResults = await getFullResults(
        userLatestAnswersIds,
        user.Survey_user_group.surveyId
      )

      return {
        userId: user.id,
        results: detailedUserResults,
      }
    })
  )

  const categories = usersInGroupResults[0].results.categoryResults

  categories.forEach((category, index) => {
    const averageInCategory = _.meanBy(
      usersInGroupResults,
      (u) => u.results.categoryResults[index].userPoints
    )
    categories[index].groupAverage = averageInCategory
  })
  const mappedCategories = categories.map((c) => ({
    name: c.name,
    groupAverage: c.groupAverage,
  }))

  return mappedCategories
}

module.exports = getGroupAverage
