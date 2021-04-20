const categories = require('./testData/categories.json')
const questions = require('./testData/questions.json')
const question_answers = require('./testData/question_answers.json')
const survey_results = require('./testData/survey_results.json')
const category_results = require('./testData/category_results.json')
const surveys = require('./testData/surveys.json')
const survey_user_groups = require('./testData/survey_user_groups.json')
const organizations = require('./testData/organizations.json')
const users = require('./testData/users.json')
const user_answers = require('./testData/user_answers.json')
const {
  sequelize,
  Question,
  Category,
  Question_answer,
  Survey_result,
  Survey,
  Category_result,
  Survey_user_group,
  Organization,
  User,
  User_answer,
} = require('../../models')

/*
  currently app has to be started in test mode before running robot.
  Following code ensures that app has data during build-time before robot
  inserts seed data (testData copied from seed_database.sql)
*/
const clearDBAndCreateDummyData = async () => {
  await sequelize.sync({ force: true })
  await Survey.bulkCreate(surveys)
  await Survey_result.bulkCreate(survey_results)
  await Category.bulkCreate(categories)
  await Category_result.bulkCreate(category_results)
  await Question.bulkCreate(questions)
  await Question_answer.bulkCreate(question_answers)
  await Organization.bulkCreate(organizations)
  await Survey_user_group.bulkCreate(survey_user_groups)
  await User.bulkCreate(users)
  await User_answer.bulkCreate(user_answers)
}

module.exports = { clearDBAndCreateDummyData }
