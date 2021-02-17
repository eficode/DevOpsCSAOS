const resultsRouter = require('express').Router()
const Sequelize = require('sequelize')
const { Result } = require('../models')

resultsRouter.get('/', async (req, res) => {
  try {
    const results = await Result.findAll()
    return res.json(results)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch results' })
  }
})

module.exports = resultsRouter
