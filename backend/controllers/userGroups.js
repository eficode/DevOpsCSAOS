const userGroupRouter = require('express').Router()
const { Survey_user_group } = require('../models')
const validate = require('uuid-validate')

userGroupRouter.get('/:groupid', async (req, res) => {
  const { groupid } = req.params
  const isValidUUID = validate(groupid)

  if (!isValidUUID) {
    return res.status(200).json({ result: false })
  }

  try {
    const userGroup = await Survey_user_group.findOne({
      where: {
        id: groupid,
      },
    })
    if(!userGroup) {
      return res.status(200).json({ result: false })
    } else {
      return res.status(200).json({ result: true })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Unable to fetch user groups' })
  }
})

module.exports = userGroupRouter
