const categoriesRouter = require('express').Router()
const { Category, Question } = require('../models')

categoriesRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll()
    return res.json(categories)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch answers' })
  }
})

categoriesRouter.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params
  try {
    const questions = await Question.findAll({
      where: { categoryId },
    })
    return res.json(questions)
  } catch (e) {
    return res.status(500).send('Failed to query database')
  }
})

module.exports = categoriesRouter
