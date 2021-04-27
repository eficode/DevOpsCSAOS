const userGroupRouter = require('express').Router()
const validateAsUuid = require('uuid-validate')
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

userGroupRouter.get('/results/:groupid', async (req, res) => {
  const { groupid } = req.params
  const isValidUUID = validateAsUuid(groupid)

  if (!isValidUUID) {
    return res.status(400).json({ result: false })
  }

  try {
    const userGroup = await (
      await User.findAll({
        attributes: [
          sequelize.fn(
            'DISTINCT',
            sequelize.col('User_answer.Question_answer.Question.id')
          ),
          'id',
        ],
        where: {
          groupId: groupid,
        },
        include: [
          {
            model: User_answer,
            attributes: ['createdAt', 'questionAnswerId'],
            include: [
              {
                model: Question_answer,
                attributes: ['id'],
                include: [
                  {
                    model: Question,
                  },
                ],
              },
            ],
            distinct: 'Question_answer.Question.id',
            order: [['createdAt', 'DESC']],
          },
        ],
        nest: true,
        order: [['createdAt', 'DESC']],
      })
    ).map((el) => el.get({ plain: true }))
    console.log(userGroup[0].User_answers[0])
    console.log(userGroup[0].User_answers[1])
    console.log(userGroup)

    if (!userGroup) {
      return res.status(200).json({ groupAverageResult: '' })
    }
    return res.status(200).json({ result: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Unable to fetch user groups' })
  }
})

module.exports = userGroupRouter
