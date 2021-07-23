// const categories = require('./initialData/categories.json')
// const questions = require('./initialData/questions.json')
// const question_answers = require('./initialData/question_answers.json')
// const survey_results = require('./initialData/survey_results.json')
// const category_results = require('./initialData/category_results.json')
const S3Bucket = require('aws-sdk/clients/s3')
const surveys = require('./initialData/surveys.json')
const survey_user_groups = require('./initialData/survey_user_groups.json')
// const industries = require('./initialData/industries.json')
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

const readTextFile = (file_name) =>
  new Promise((resolve, reject) => {
    const s3Bkt = new S3Bucket({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    })
    const params = { Bucket: process.env.AWS_BUCKET, Key: file_name }
    s3Bkt.getObject(params, (err, data) => {
      if (err) {
        reject(err.message)
      } else {
        const json_content = JSON.parse(
          Buffer.from(data.Body).toString('utf-8')
        )
        resolve(json_content)
      }
    })
  })

const getJSONFiles = async () => {
  try {
    const json_file_names = [
      'questions.json',
      'categories.json',
      'survey_results.json',
      'category_results.json',
      'industries.json',
    ]

    const s3Data = await Promise.all(
      json_file_names.map((item) => readTextFile(item))
    )
    return s3Data
  } catch (err) {
    console.log('Error', err)
  }
  return []
}

/*
  currently app has to be started in test mode before running robot.
  Following code ensures that app has data during build-time before robot
  inserts seed data (testData copied from seed_database.sql)
*/
const initDatabase = async () => {
  const [questions, categories, survey_results, category_results, industries] =
    await getJSONFiles()
  const answers = await generateAnswerData(questions.length)

  await sequelize.sync({ alter: true })
  await Survey.bulkCreate(surveys, {
    updateOnDuplicate: ['id'],
  })
  await Industry.bulkCreate(industries, {
    updateOnDuplicate: ['name'],
  })
  
  await Survey_result.bulkCreate(survey_results, {
    updateOnDuplicate: ['text'],
  })

  await Category.bulkCreate(categories, {
    updateOnDuplicate: ['name', 'description'],
  })
  await Category_result.bulkCreate(category_results, {
    updateOnDuplicate: ['text'],
  })
  await Question.bulkCreate(questions, {
    updateOnDuplicate: ['text', 'category_weights'],
  })

  await Question_answer.bulkCreate(answers, {
    updateOnDuplicate: ['text'],
  })
  
  await Survey_user_group.bulkCreate(survey_user_groups, {
    updateOnDuplicate: ['id'],
  })
}

module.exports = { initDatabase }
