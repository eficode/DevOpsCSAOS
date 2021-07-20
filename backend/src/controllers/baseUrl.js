const locationRouter = require('express').Router()

locationRouter.get('/', async (req, res) => {
  try {
    return res.status(200).json(process.env.BASE_URL_FOR_EMAILS)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to return location URL' })
  }
})

module.exports = locationRouter
