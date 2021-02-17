const resultsRouter = require('express').Router()
const Sequelize = require('sequelize')
const { Result } = require('../models')

resultsRouter.post('/', async (req, res) => {
  const { score } = req.body
  const { Op } = Sequelize
  let resultText
  try {
    resultText = await Result.findOne({
      where: {
        lowestScore: { [Op.lte]: score },
        highestScore: { [Op.gte]: score },
      },
      raw: true,
    })
    return res.status(200).json({ resultText: resultText.text })
  } catch (err) {
    return res.status(500).json(err)
  }
})

resultsRouter.get('/', async (req, res) => {
  try {
    const results = await Result.findAll()
    return res.json(results)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch results' })
  }
})

module.exports = resultsRouter
