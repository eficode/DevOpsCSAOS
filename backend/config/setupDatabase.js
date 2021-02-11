const categories = require('./initialData/categories.json')
const questions = require('./initialData/questions.json')
const users = require('./initialData/users.json')
const answers = require('./initialData/answers.json')

const { sequelize, Question, Category, User, Answer } = require('../models')

const initDatabase = async () => {
  await sequelize.sync({ force: true })
  await Category.bulkCreate(categories)
  await User.bulkCreate(users)
  await Question.bulkCreate(questions)
  await Answer.bulkCreate(answers)
}

module.exports = { initDatabase }
