//helper for industry average

const getIndustryAverage = (industryId) => {
  // get all users in industry
  // get all results for users in industry
  // compute average

  const usersInIndustry = await (
    await User.findAll({
      include: [
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

  //const industryAverage = ... calculate from data fetched above
}

module.exports = getIndustryAverage