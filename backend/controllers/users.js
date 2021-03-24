const usersRouter = require('express').Router()
const { User } = require('../models')

usersRouter.post('/', async (req, res) => {
  const { email, organizationId } = req.body
  try {
    const user = await User.create({ email, organizationId })

    return res.json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// get by email
usersRouter.get('/:email', async (req, res) => {
  const { email } = req.params
  try {
    const users = await User.findOne({
      where: { email },
    })
    return res.json(users)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch users' })
  }
})

module.exports = usersRouter
