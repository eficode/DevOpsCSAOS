const Sequelize = require('sequelize')
const {
  User_answer,
  Question,
  Question_answer,
  Category,
  Category_result,
  Survey_result,
  sequelize,
} = require('../../models')

const getResults = async (user_answers, surveyId) => {
  const { Op } = Sequelize

  const bestAnswerPerQuestion = await Question_answer.findAll({
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

  let categoryResults = []
  const surveyMaxResult = bestAnswerPerQuestion.reduce(
    (accumulator, currentValue) => accumulator + currentValue.points,
    0
  )

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

  categoryResults.forEach(async (category) => {
    const answersInCategory = userAnswers.filter(
      (question) => question.Question.Category.id === category.id
    )
    const userPointsInCategory = answersInCategory.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.points),
      0
    )

    const pointsOutOfMaxCategory = category.userPoints / category.maxPoints
    

    categoryResults = categoryResults.map((categ) =>
      categ.id === category.id
        ? {
            ...category,
            userPoints: userPointsInCategory,
            text: '',
          }
        : { ...categ }
    )
    
  })
  
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

const deleteUserSurveyAnswers = async (userId, surveyId) => {
  const allUserAnswers = await User_answer.findAll({
    attributes: ['id'],
    include: [
      {
        model: Question_answer,
        attributes: ['text', 'id'],
        include: [
          {
            model: Question,
            attributes: ['id', 'surveyId'],
          },
        ],
      },
    ],
    where: {
      userId: userId,
    },
    raw: true,
    nest: true,
  })

  let allUserSurveyAnswers = allUserAnswers.filter(
    (userAnswer) => userAnswer.Question_answer.Question.surveyId === surveyId
  )
  allUserSurveyAnswers = allUserSurveyAnswers.map((answer) => answer.id)

  await User_answer.destroy({ where: { id: allUserSurveyAnswers } })
}

const verifyUserAnswers = async (userAnswers, surveyId) => {
  const allSurveyQuestions = await Question.findAll({
    attributes: ['id', 'surveyId', 'text', 'categoryId'],
    where: {
      surveyId: surveyId,
    },
    raw: true,
    nest: true,
  })

  const userQuestionAnswers = await Question_answer.findAll({
    where: {
      id: userAnswers,
    },
    order: [['questionId', 'ASC']],
    raw: true,
    nest: true,
  })

  const duplicates = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < userQuestionAnswers.length - 1; i++) {
    if (
      userQuestionAnswers[i + 1].questionId ===
      userQuestionAnswers[i].questionId
    ) {
      duplicates.push({
        questionId: userQuestionAnswers[i].questionId,
      })
    }
  }

  const unAnsweredQuestions = allSurveyQuestions.filter((question) => {
    const found = userQuestionAnswers.find(
      (question_answer) => question_answer.questionId === question.id
    )

    if (!found) {
      return true
    }
    return false
  })

  return {
    unAnsweredQuestions,
    duplicates,
  }
}

module.exports = { verifyUserAnswers, deleteUserSurveyAnswers, getResults }
