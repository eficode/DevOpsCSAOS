const { Question, Question_answer } = require('../../models')

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

  const unAnsweredQuestionsFound = allSurveyQuestions.find(
    (question) =>
      !userQuestionAnswers.find(
        (question_answer) => question_answer.questionId === question.id
      )
  )

  return {
    unAnsweredQuestionsFound,
    duplicatesFound: duplicates.length !== 0,
  }
}

module.exports = { verifyUserAnswers }
