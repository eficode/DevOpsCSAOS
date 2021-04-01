const Sequelize = require('sequelize')
const {
  Question,
  Question_answer,
  Category,
  Survey_result,
  sequelize,
} = require('../../models')

const getResults = async (user_answers, surveyId) => {
  const { Op } = Sequelize

  const bestAnswerPerQuestion = await findAnswerWithHighestPointsPerQuestion(surveyId)

  const surveyMaxResult = await calculateMaxPointsOfSurvey(bestAnswerPerQuestion)

  const userAnswers = await findUserAnswers(user_answers)

  // categoryResults: array of category items, each category object contains attributes userId and categoryId
  const categoryResults = calculateMaxPointsAndUserPointsPerCategory(bestAnswerPerQuestion, userAnswers)

  const userSurveyResult = categoryResults.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.userPoints),
    0
  )

  const pointsOutOfMax = userSurveyResult / surveyMaxResult

  const surveyResult = await Survey_result.findOne({
    attributes: ['text', 'surveyId', 'cutoff_from_maxpoints'],
    where: {
      cutoff_from_maxpoints: { [Op.gte]: pointsOutOfMax },
      surveyId: surveyId,
    },
    order: [['cutoff_from_maxpoints', 'ASC']],
    raw: true,
  })

  const results = {
    surveyResult: {
      text: surveyResult.text,
      userPoints: userSurveyResult,
      maxPoints: surveyMaxResult,
    },
    categoryResults: categoryResults,
  }

  return results
}

const findAnswerWithHighestPointsPerQuestion = async (surveyId) => {
  const highestScoringOptions = await Question_answer.findAll({
    attributes: [[sequelize.fn('max', sequelize.col('points')), 'points']],
    include: [
      {
        model: Question,
        where: {
          surveyId: surveyId,
        },
        include: [
          {
            model: Category,
            attributes: ['name', 'id', 'description'],
          },
        ],
      },
    ],
    group: ['Question.id', 'Question.Category.id'],
    raw: true,
    nest: true,
  })

  return highestScoringOptions
}

const calculateMaxPointsOfSurvey = async (bestAnswerPerQuestion) => (
  bestAnswerPerQuestion.reduce(
    (accumulator, currentValue) => accumulator + currentValue.points,
    0
  )
)

const findUserAnswers = async (user_answers) => {
  const userAnswers = await Question_answer.findAll({
    attributes: [[sequelize.fn('sum', sequelize.col('points')), 'points']],
    include: [
      {
        model: Question,
        attributes: ['text', 'id'],
        include: [
          {
            model: Category,
          },
        ],
      },
    ],
    where: {
      id: user_answers,
    },
    group: ['Question.Category.id', 'Question.id'],
    raw: true,
    nest: true,
  })

  return userAnswers
}

module.exports = { getResults }

function calculateMaxPointsAndUserPointsPerCategory(bestAnswerPerQuestion, userAnswers) {
  let categoryResults = []
  // here: user points and max points are calculated per category
  bestAnswerPerQuestion.forEach((question) => {
    const isCategoryInList = categoryResults.find(
      (category) => category.id === question.Question.Category.id
    )
    if (!isCategoryInList) {
      categoryResults.push({
        ...question.Question.Category,
        userPoints: 0,
        maxPoints: question.points,
      })
    } else {
      categoryResults = categoryResults.map((category) => category.id === question.Question.Category.id
        ? { ...category, maxPoints: category.maxPoints + question.points }
        : { ...category }
      )
    }
  })


  categoryResults.forEach(async (category) => {
    const answersInCategory = userAnswers.filter(
      (question) => question.Question.Category.id === category.id
    )

    const userPointsInCategory = answersInCategory.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.points),
      0
    )

    categoryResults = categoryResults.map((categ) => categ.id === category.id
      ? {
        ...category,
        userPoints: userPointsInCategory,
        text: '',
      }
      : { ...categ }
    )
  })
  return categoryResults
}
