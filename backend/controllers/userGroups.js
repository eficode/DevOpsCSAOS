const userGroupRouter = require('express').Router()
const validateAsUuid = require('uuid-validate')
const { getFullResults } = require('./helpers/getResults')
const {
  Survey_user_group,
  User,
  User_answer,
  Question,
  Question_answer,
  sequelize,
} = require('../models')

userGroupRouter.get('/:groupid', async (req, res) => {
  const { groupid } = req.params
  const isValidUUID = validateAsUuid(groupid)

  if (!isValidUUID) {
    return res.status(400).json({ result: false })
  }

  try {
    const userGroup = await Survey_user_group.findOne({
      where: {
        id: groupid,
      },
    })
    if (!userGroup) {
      return res.status(200).json({ result: false })
    }
    return res.status(200).json({ result: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Unable to fetch user groups' })
  }
})

const findUserLatestAnswersIds = async (userId) => {
  const allUserAnswers = await User_answer.findAll({
    where: {
      userId: userId,
    },
    nest: true,
    raw: true,
    order: [['createdAt', 'DESC']],
  })
  const latestUserAnswersCreatedAt = allUserAnswers[0].createdAt

  const latestUserAnswers = allUserAnswers
    .filter(
      (userAnswer) =>
        userAnswer.createdAt.toString() ===
        latestUserAnswersCreatedAt.toString()
    )
    .map((userAnswer) => userAnswer.questionAnswerId)
  return latestUserAnswers
}

userGroupRouter.get('/results/:groupid', async (req, res) => {
  const { groupid } = req.params
  const isValidUUID = validateAsUuid(groupid)

  if (!isValidUUID) {
    return res.status(400).json({ message: 'groupId is not valid uuid' })
  }

  try {
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

    return res.status(200).json(usersInGroupResults)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Unable to fetch user groups' })
  }
})

module.exports = userGroupRouter
