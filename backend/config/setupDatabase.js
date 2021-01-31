const categories = require('./categories.json')
const questions = require('./questions.json')

const { sequelize, Question, Category } = require('../models')

const initDatabase = async () => {
//  await sequelize.sync()

  categories.forEach(async (category) => {
    await Category.create(category)
  })

  questions.forEach(async (question) => {
    await Question.create(question)
  })
}

module.exports = { initDatabase }
