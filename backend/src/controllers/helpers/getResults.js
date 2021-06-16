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
    attributes: ['category_weights', 'id'],
  })

  const allAnswers = await Question_answer.findAll({
    raw: true,
    where: { id: answerIds },
    attributes: ['id', 'points'],
  })

  const questionsAndPoints = selections.map((item) => {
    let currentQuestion = allQuestions.find((question) => {
      return question.id === item.questionId
    })

    let currentAnswer = allAnswers.find((answer) => {
      return answer.id === item.answerId
    })

    return {
      ...currentQuestion,
      points: currentAnswer.points,
    }
  })

  let listOfAllCategoryPoints = []
  let listOfAllMaxPoints = []
  questionsAndPoints.forEach((question) => {
    question.category_weights.forEach((item) => {
      let maxItem = {
        ...item,
      }
      maxItem.multiplier = Math.abs(item.multiplier) * 2
      item.multiplier = item.multiplier * question.points
      listOfAllCategoryPoints.push(item)
      listOfAllMaxPoints.push(maxItem)
    })
  })

  let userResult = listOfAllCategoryPoints.reduce((c, item) => {
    return {
      ...c,
      [item.category]: (c[item.category] || 0) + item.multiplier,
    }
  }, {})

  let maxResult = listOfAllMaxPoints.reduce((c, item) => {
    return {
      ...c,
      [item.category]: (c[item.category] || 0) + item.multiplier,
    }
  }, {})

  const completeResult = {
    user: userResult,
    max: maxResult,
  }

  return completeResult
}

const getSummaryOfResults = async (surveyId, selections) => {
  const userAndMaxResults = await calculatePointsNewStyle(selections)

  const userScores = userAndMaxResults.user
  const maxScores = userAndMaxResults.max
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b)
  const newUserScore = sumValues(userScores)
  const newMaxScore = sumValues(maxScores)

  console.log('scores', userAndMaxResults)
  const surveyResultText = await findSurveyResultTextMatchingUserScore(
    newUserScore,
    newMaxScore,
    surveyId
  )


  const keys = Object.keys(userScores)

  const listOfCategories = keys

  let lowestCategory = keys[0]
  let highestCategory = keys[1]
  console.log(highestCategory)
  console.log(lowestCategory)
  keys.forEach((key) => {
    if (
      userScores[key] / maxScores[key] <
      userScores[lowestCategory] / maxScores[lowestCategory]
    ) {
      lowestCategory = key
    }
    if (
      userScores[key] / maxScores[key] >
      userScores[highestCategory] / maxScores[highestCategory]
    ) {
      highestCategory = key
    }
  })


  return {
    surveyResult: {
      text: surveyResultText,
      userPoints: newUserScore,
      maxPoints: newMaxScore,
    },
    categories: listOfCategories,
    userBestInCategory: highestCategory,
    userWorstInCategory: lowestCategory,
  }
}

module.exports = {
  getFullResults,
  getSummaryOfResults,
  calculatePointsNewStyle,
}
