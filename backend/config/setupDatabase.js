const categories = require('./categories.json')
const questions = require('./questions.json')
const users = require('./users.json')

const { sequelize, Question, Category, User } = require('../models')

const initDatabase = async () => {
  await sequelize.sync({ force: true })
  await Category.bulkCreate(categories)
  await User.bulkCreate(users)
  await Question.bulkCreate(questions)
}

module.exports = { initDatabase }
