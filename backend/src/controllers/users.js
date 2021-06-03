const usersRouter = require('express').Router()
const { User } = require('../../models')

usersRouter.post('/', async (req, res) => {
  const { email, organizationId } = req.body
  try {
    const user = await User.create({ email, organizationId })

    return res.json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = usersRouter
