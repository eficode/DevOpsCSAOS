const categories = require('./initialData/categories.json')
const questions = require('./initialData/questions.json')
const users = require('./initialData/users.json')
const answers = require('./initialData/answers.json')
const results = require('./initialData/results.json')

const categoriesTestData = require('./initialTestData/categories.json')
const questionsTestData = require('./initialTestData/questions.json')
const resultsTestData = require('./initialTestData/results.json')

const {
  sequelize,
  Question,
  Category,
  User,
  Answer,
  Result,
} = require('../models')

/*
  currently app has to be started in test mode before running robot.
  This ensures that app has data during build-time before robot
  inserts seed data (testData copied from seed_database.sql)
*/
const initDatabase = process.env.NODE_ENV === 'test' ? 
async () => {
  await sequelize.sync({ force: true })
  await Category.bulkCreate(categoriesTestData)
  await Question.bulkCreate(questionsTestData)
  await Result.bulkCreate(resultsTestData)
}
:
async () => {
  await sequelize.sync({ force: true })
  await Category.bulkCreate(categories)
  await User.bulkCreate(users)
  await Question.bulkCreate(questions)
  await Answer.bulkCreate(answers)
  await Result.bulkCreate(results)
}

module.exports = { initDatabase }
