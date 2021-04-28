//helper for group average
const {
  Survey_user_group,
  User,
} = require('../../models')

const getGroupAverage = (groupid) => {
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

  // todo: compute averages (all data fetched from db at dis point)
}

module.exports = getGroupAverage
