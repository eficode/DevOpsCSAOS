const categories = require('./initialData/categories.json')
const questions = require('./initialData/questions.json')
const question_answers = require('./initialData/question_answers.json')
const survey_results = require('./initialData/survey_results.json')
const category_results = require('./initialData/category_results.json')
const surveys = require('./initialData/surveys.json')
const survey_user_groups = require('./initialData/survey_user_groups.json')
const industries = require('./initialData/industries.json')
const { generateAnswerData } = require('./generateAnswerData')

const {
  sequelize,
  Question,
  Category,
  Question_answer,
  Survey_result,
  Survey,
  Category_result,
  Survey_user_group,
  Industry,
} = require('../models')

/*
  currently app has to be started in test mode before running robot.
  Following code ensures that app has data during build-time before robot
  inserts seed data (testData copied from seed_database.sql)
*/
const initDatabase = async () => {
  // const answers = await generateAnswerData()

  // await sequelize.sync({ force: true })
  await sequelize.sync({ force: true })
  await Survey.bulkCreate(surveys, {
    updateOnDuplicate: ['id'],
  })
  await Survey_result.bulkCreate(survey_results, {
    updateOnDuplicate: ['id'],
  })
  await Category.bulkCreate(categories, {
    updateOnDuplicate: ['id'],
  })
  await Category_result.bulkCreate(category_results, {
    updateOnDuplicate: ['id'],
  })
  await Question.bulkCreate(questions, {
    updateOnDuplicate: ['id'],
  })
  await Question_answer.bulkCreate(question_answers, {
    updateOnDuplicate: ['id'],
  })
  await Industry.bulkCreate(industries, {
    updateOnDuplicate: ['name'],
  })
  await Survey_user_group.bulkCreate(survey_user_groups, {
    updateOnDuplicate: ['id'],
  })
}

module.exports = { initDatabase }
