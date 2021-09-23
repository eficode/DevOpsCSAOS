/* eslint-disable camelcase */
const { keyBy } = require('lodash')
const Sequelize = require('sequelize')
const {
  Question,
  Question_answer,
  Category,
  Category_result,
  Survey_result,
} = require('../../../models')

// const findAnswerWithHighestPointsPerQuestion = async (surveyId) => {
//   const highestScoringOptions = await Question_answer.findAll({
//     attributes: [[sequelize.fn('max', sequelize.col('points')), 'points']],
//     include: [
//       {
//         model: Question,
//         where: {
//           surveyId: surveyId,
//         },
//         include: [
//           {
//             model: Category,
//             attributes: ['name', 'id', 'description'],
//           },
//         ],
//       },
//     ],
//     group: ['Question.id', 'Question.Category.id'],
//     raw: true,
//     nest: true,
//   })

//   return highestScoringOptions
// }

// const calculateMaxPointsOfSurvey = async (bestAnswerPerQuestion) =>
//   bestAnswerPerQuestion.reduce(
//     (accumulator, currentValue) => accumulator + currentValue.points,
//     0
//   )

// const findUserAnswers = async (user_answers) => {
//   const userAnswers = await Question_answer.findAll({
//     attributes: [[sequelize.fn('sum', sequelize.col('points')), 'points']],
//     include: [
//       {
//         model: Question,
//         attributes: ['text', 'id'],
//         include: [
//           {
//             model: Category,
//           },
//         ],
//       },
//     ],
//     where: {
//       id: user_answers,
//     },
//     group: ['Question.Category.id', 'Question.id'],
//     raw: true,
//     nest: true,
//   })

//   return userAnswers
// }

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

// const calculateMaxPointsAndUserPointsPerCategory = async (
//   bestAnswerPerQuestion,
//   userAnswers
// ) => {
//   let categoryResults = []
//   // calculate max points per category
//   bestAnswerPerQuestion.forEach((question) => {
//     const isCategoryInList = categoryResults.find(
//       (category) => category.id === question.Question.Category.id
//     )
//     if (!isCategoryInList) {
//       categoryResults.push({
//         ...question.Question.Category,
//         userPoints: 0,
//         maxPoints: question.points,
//       })
//     } else {
//       categoryResults = categoryResults.map((category) =>
//         category.id === question.Question.Category.id
//           ? { ...category, maxPoints: category.maxPoints + question.points }
//           : { ...category }
//       )
//     }
//   })

//   // find user answers per category and update category user results with these points
//   await Promise.all(
//     categoryResults.map(async (category) => {
//       const answersInCategory = userAnswers.filter(
//         (question) => question.Question.Category.id === category.id
//       )

//       const userPointsInCategory = answersInCategory.reduce(
//         (accumulator, currentValue) =>
//           accumulator + Number(currentValue.points),
//         0
//       )

//       // find right text matching user result
//       const categoryResultText = await findCategoryResultTextMatchingUserResult(
//         userPointsInCategory,
//         category.maxPoints,
//         category.id
//       )

//       categoryResults = categoryResults.map((categ) =>
//         categ.id === category.id
//           ? {
//               ...category,
//               userPoints: userPointsInCategory,
//               text: categoryResultText,
//             }
//           : { ...categ }
//       )
//     })
//   )
//   return categoryResults
// }

const getQuestionsAndPoints = async (user_answers) => {
  const allAnswers = await Question_answer.findAll({
    raw: true,
    where: { id: user_answers },
    attributes: ['id', 'questionId', 'points'],
  })

  const questionIds = allAnswers.map((item) => item.questionId)

  const allQuestions = await Question.findAll({
    raw: true,
    where: { id: questionIds },
    attributes: ['category_weights', 'id'],
  })

  const questionAndAnswerPairs = allAnswers.map((item) => ({
    questionId: item.questionId,
    answerId: item.id,
  }))

  return questionAndAnswerPairs.map((item) => {
    const currentQuestion = allQuestions.find(
      (question) => question.id === item.questionId
    )

    const currentAnswer = allAnswers.find(
      (answer) => answer.id === item.answerId
    )

    return {
      ...currentQuestion,
      points: currentAnswer.points,
    }
  })
}

const getUserScoreAndMaxScore = (questionsAndPoints) => {
  const listOfAllCategoryPoints = []
  const listOfAllMaxPoints = []
  questionsAndPoints.forEach((question) => {
    question.category_weights.forEach((item) => {
      const maxItem = {
        ...item,
      }
      maxItem.multiplier = Math.abs(item.multiplier) * 2
      const userItem = {
        ...item,
      }
      userItem.multiplier *= question.points
      listOfAllCategoryPoints.push(userItem)
      listOfAllMaxPoints.push(maxItem)
    })
  })

  const userResult = listOfAllCategoryPoints.reduce(
    (c, item) => ({
      ...c,
      [item.category]: (c[item.category] || 0) + item.multiplier,
    }),
    {}
  )

  const maxResult = listOfAllMaxPoints.reduce(
    (c, item) => ({
      ...c,
      [item.category]: (c[item.category] || 0) + item.multiplier,
    }),
    {}
  )

  const completeResult = {
    user: userResult,
    max: maxResult,
  }

  return completeResult
}

const calculateUserAndMaxPoints = async (user_answers) => {
  const questionsAndPoints = await getQuestionsAndPoints(user_answers)

  return getUserScoreAndMaxScore(questionsAndPoints)
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

// const calculateSumOfUserPoints = (userAnswers) =>
//   userAnswers.reduce(
//     (accumulator, currentValue) => accumulator + Number(currentValue.points),
//     0
//   )

const getFullResults = async (user_answers, surveyId) => {
  const userAndMaxResults = await calculateUserAndMaxPoints(user_answers)

  const userScores = userAndMaxResults.user
  const maxScores = userAndMaxResults.max
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b)
  const newUserScore = sumValues(userScores)
  const newMaxScore = sumValues(maxScores)

  const surveyResultText = await findSurveyResultTextMatchingUserScore(
    newUserScore,
    newMaxScore,
    surveyId
  )

  const keys = Object.keys(userAndMaxResults.user)
  const newCategoryResults = await keys.map(async (key) => {
    const fetchedCategory = await Category.findOne({
      attributes: ['id', 'description'],
      where: {
        name: key,
      },
      raw: true,
    })


    return {
      userPoints: maxScores[key] + userScores[key],
      maxPoints: maxScores[key] * 2,
      name: key,
      id: fetchedCategory.id,
      text: await findCategoryResultTextMatchingUserResult(
        userScores[key],
        maxScores[key],
        fetchedCategory.id
      ),
      description: fetchedCategory.description,
    }
  })

  const finalCategoryResults = await Promise.all(newCategoryResults)

  let lowestCategory = keys[0]
  let highestCategory = keys[1]

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
      userPoints: newMaxScore + newUserScore,
      maxPoints: newMaxScore * 2,
      userBestInCategory: highestCategory,
      userWorstInCategory: lowestCategory,
    },
    categoryResults: finalCategoryResults,
  }
}

const getSummaryOfResults = async (user_answers, surveyId) => {
  const userAndMaxResults = await calculateUserAndMaxPoints(user_answers)

  const userScores = userAndMaxResults.user
  const maxScores = userAndMaxResults.max
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b)
  const newUserScore = sumValues(userScores)
  const newMaxScore = sumValues(maxScores)

  const surveyResultText = await findSurveyResultTextMatchingUserScore(
    newUserScore,
    newMaxScore,
    surveyId
  )

  const keys = Object.keys(userScores)

  const listOfCategories = keys

  let lowestCategory = keys[0]
  let highestCategory = keys[1]

  let categoryResults = Object.assign({}, userScores)

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

  keys.forEach((key) => {
    categoryResults[key] = {
      userScore: userScores[key] + maxScores[key],
      maxScore: maxScores[key] * 2,
    }
  })

  // console.log('categoryResults', categoryResults)

  return {
    surveyResult: {
      text: surveyResultText,
      userPoints: newUserScore + newMaxScore,
      maxPoints: newMaxScore * 2,
    },
    categories: listOfCategories,
    userBestInCategory: highestCategory,
    userWorstInCategory: lowestCategory,
    categoryResults: categoryResults,
  }
}

module.exports = {
  getFullResults,
  getSummaryOfResults,
}
