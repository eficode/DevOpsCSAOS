const industryRouter = require('express').Router()
const { Industry } = require('../models')

industryRouter.get('/', async (req, res) => {
  try {
    const industries = await Industry.findAll()

    return res.status(200).json(industries)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch industries' })
  }
})

module.exports = industryRouter
