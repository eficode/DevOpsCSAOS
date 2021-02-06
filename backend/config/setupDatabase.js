const categories = require('./categories.json')
const questions = require('./questions.json')
const users = require('./users.json')
const answers = require('./answers.json')

const { sequelize, Question, Category, User, Answer } = require('../models')

const initDatabase = async () => {
  await sequelize.sync({ force: true })
  await Category.bulkCreate(categories)
  await User.bulkCreate(users)
  await Question.bulkCreate(questions)
  await Answer.bulkCreate(answers)
}

module.exports = { initDatabase }
