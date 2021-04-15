const categories = require('./initialData/categories.json')
const questions = require('./initialData/questions.json')
const question_answers = require('./initialData/question_answers.json')
const survey_results = require('./initialData/survey_results.json')
const category_results = require('./initialData/category_results.json')
const surveys = require('./initialData/surveys.json')
const organizations = require('./initialData/organizations.json')
const survey_user_groups = require('./initialData/survey_user_groups.json')

const {
  sequelize,
  Question,
  Category,
  Question_answer,
  Survey_result,
  Survey,
  Category_result,
  Organization,
  Survey_user_group,
} = require('../models')

/*
  currently app has to be started in test mode before running robot.
  Following code ensures that app has data during build-time before robot
  inserts seed data (testData copied from seed_database.sql)
*/
const initDatabase = async () => {
  await sequelize.sync({ force: true })
  await Survey.bulkCreate(surveys)
  await Survey_result.bulkCreate(survey_results)
  await Category.bulkCreate(categories)
  await Category_result.bulkCreate(category_results)
  await Question.bulkCreate(questions)
  await Question_answer.bulkCreate(question_answers)
  await Organization.bulkCreate(organizations)
  await Survey_user_group.bulkCreate(survey_user_groups)
}

module.exports = { initDatabase }
