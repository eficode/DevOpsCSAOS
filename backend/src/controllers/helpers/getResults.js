/* eslint-disable camelcase */
const { max } = require('lodash')
const Sequelize = require('sequelize')
const {
  Question,
  Question_answer,
  Category,
  Category_result,
  Survey_result,
  sequelize,
} = require('../../../models')

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

const calculateMaxPointsOfSurvey = async (bestAnswerPerQuestion) =>
  bestAnswerPerQuestion.reduce(
    (accumulator, currentValue) => accumulator + currentValue.points,
    0
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

const findCategoryResultTextMatchingUserResult = async (
  userCategoryResult,
  categoryMaxResult,
  categoryId
) => {
  const { Op } = Sequelize
  const pointsOutOfMax = userCategoryResult / categoryMaxResult

  const categoryResult = await Category_result.findOne({
    attributes: ['text', 'categoryId', 'cutoff_from_maxpoints'],
    where: {
      cutoff_from_maxpoints: { [Op.gte]: pointsOutOfMax },
      categoryId: categoryId,
    },
    order: [['cutoff_from_maxpoints', 'ASC']],
    raw: true,
  })

  return categoryResult.text
}

const calculateMaxPointsAndUserPointsPerCategory = async (
  bestAnswerPerQuestion,
  userAnswers
) => {
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
      categoryResults = categoryResults.map((category) =>
        category.id === question.Question.Category.id
          ? { ...category, maxPoints: category.maxPoints + question.points }
          : { ...category }
      )
    }
  })

  // find user answers per category and update category user results with these points
  await Promise.all(
    categoryResults.map(async (category) => {
      const answersInCategory = userAnswers.filter(
        (question) => question.Question.Category.id === category.id
      )

      const userPointsInCategory = answersInCategory.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.points),
        0
      )

      // find right text matching user result
      const categoryResultText = await findCategoryResultTextMatchingUserResult(
        userPointsInCategory,
        category.maxPoints,
        category.id
      )

      categoryResults = categoryResults.map((categ) =>
        categ.id === category.id
          ? {
              ...category,
              userPoints: userPointsInCategory,
              text: categoryResultText,
            }
          : { ...categ }
      )
    })
  )
  return categoryResults
}

const findSurveyResultTextMatchingUserScore = async (
  userSurveyResult,
  surveyMaxResult,
  surveyId
) => {
  const { Op } = Sequelize
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

const calculateSumOfUserPoints = (userAnswers) =>
  userAnswers.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.points),
    0
  )

const getFullResults = async (user_answers, surveyId) => {
  const bestAnswerPerQuestion = await findAnswerWithHighestPointsPerQuestion(
    surveyId
  )
  const userAnswers = await findUserAnswers(user_answers)

  const surveyMaxResult = await calculateMaxPointsOfSurvey(
    bestAnswerPerQuestion
  )
  const userSurveyResult = calculateSumOfUserPoints(userAnswers)
  const surveyResultText = await findSurveyResultTextMatchingUserScore(
    userSurveyResult,
    surveyMaxResult,
    surveyId
  )

  const categoryResults = await calculateMaxPointsAndUserPointsPerCategory(
    bestAnswerPerQuestion,
    userAnswers
  )

  return {
    surveyResult: {
      text: surveyResultText,
      userPoints: userSurveyResult,
      maxPoints: surveyMaxResult,
    },
    categoryResults: categoryResults,
  }
}


const calculatePointsNewStyle = async (selections) => {
  const questionIds = []
  const answerIds = []

  selections.forEach((item) => {
    questionIds.push(item.questionId)
    answerIds.push(item.answerId)
  })

  const allQuestions = await Question.findAll({
    raw: true,
    where: { id: questionIds },
    attributes: ['category_weights'],
    include: [
      {
        model: Question_answer,
        where: { id: answerIds },
        attributes: ['points'],
      },
    ],
  })

  let listOfAllCategoryPoints = []
  let listOfAllMaxPoints = []
  allQuestions.forEach((question) => {
    question.category_weights.forEach((item) => {
      let maxItem = {
        ...item
      }
      maxItem.multiplier = Math.abs(item.multiplier) * 2
      item.multiplier = item.multiplier * question['Question_answers.points']
      listOfAllCategoryPoints.push(item)
      listOfAllMaxPoints.push(maxItem)
    })
  })

  let userResult = listOfAllCategoryPoints.reduce((c, item) => {
    c[item.category] = (c[item.category] || 0) + item.multiplier
    return c
  }, {})

  let maxResult = listOfAllMaxPoints.reduce((c, item) => {
    c[item.category] = (c[item.category] || 0) + item.multiplier
    return c
  }, {})

  console.log('user points', userResult)
  console.log('max points', maxResult)

  const completeResult = {
    user: userResult,
    max: maxResult
  }

  console.log(completeResult)
}

const getSummaryOfResults = async (user_answers, surveyId) => {
  const bestAnswerPerQuestion = await findAnswerWithHighestPointsPerQuestion(
    surveyId
  )
  const userAnswers = await findUserAnswers(user_answers)

  const surveyMaxResult = await calculateMaxPointsOfSurvey(
    bestAnswerPerQuestion
  )
  const userSurveyResult = calculateSumOfUserPoints(userAnswers)
  const surveyResultText = await findSurveyResultTextMatchingUserScore(
    userSurveyResult,
    surveyMaxResult,
    surveyId
  )

  const categoryResults = await calculateMaxPointsAndUserPointsPerCategory(
    bestAnswerPerQuestion,
    userAnswers
  )

  const listOfCategories = categoryResults.map((c) => c.name)

  let userWorstInCategory = categoryResults[0]
  categoryResults.forEach((c) => {
    if (
      c.userPoints / c.maxPoints <
      userWorstInCategory.userPoints / userWorstInCategory.maxPoints
    ) {
      userWorstInCategory = c
    }
  })

  let userBestInCategory = categoryResults[0]
  categoryResults.forEach((c) => {
    if (
      c.userPoints / c.maxPoints >
      userBestInCategory.userPoints / userBestInCategory.maxPoints
    ) {
      userBestInCategory = c
    }
  })

  return {
    surveyResult: {
      text: surveyResultText,
      userPoints: userSurveyResult,
      maxPoints: surveyMaxResult,
    },
    categories: listOfCategories,
    userBestInCategory: userBestInCategory.name,
    userWorstInCategory: userWorstInCategory.name,
  }
}

module.exports = {
  getFullResults,
  getSummaryOfResults,
  calculatePointsNewStyle,
}
