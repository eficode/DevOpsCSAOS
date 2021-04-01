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
  const userAnswers = await findUserAnswers(user_answers)

  const surveyMaxResult = await calculateMaxPointsOfSurvey(bestAnswerPerQuestion)
  const userSurveyResult = calculateSumOfUserPoints(userAnswers)
  const surveyResultText = await findSurveyResultTextMatchingUserScore(userSurveyResult, surveyMaxResult, Op, surveyId)
  
  const categoryResults = calculateMaxPointsAndUserPointsPerCategory(bestAnswerPerQuestion, userAnswers)

  return {
    surveyResult: {
      text: surveyResultText,
      userPoints: userSurveyResult,
      maxPoints: surveyMaxResult,
    },
    categoryResults: categoryResults,
  }
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

const calculateMaxPointsAndUserPointsPerCategory = (bestAnswerPerQuestion, userAnswers) => {
  let categoryResults = []
  // calculate max points per category
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

  // find user answers per category and update category user results with these points
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

const findSurveyResultTextMatchingUserScore = async (userSurveyResult, surveyMaxResult, Op, surveyId) => {
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

  return surveyResult.text
}

const calculateSumOfUserPoints = (userAnswers) => {
  return userAnswers.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.points),
    0
  )
}

