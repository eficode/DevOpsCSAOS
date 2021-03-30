const {
  User_answer,
  Question,
  Question_answer,
} = require('../../models')

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

module.exports = { deleteUserSurveyAnswers }