const { User_answer } = require('../../models')

const findUserLatestAnswersIds = async (userId) => {
  const allUserAnswers = await User_answer.findAll({
    where: {
      userId: userId,
    },
    nest: true,
    raw: true,
    order: [['createdAt', 'DESC']],
  })
  const latestUserAnswersCreatedAt = allUserAnswers[0].createdAt

  const latestUserAnswers = allUserAnswers
    .filter(
      (userAnswer) =>
        userAnswer.createdAt.toString() ===
        latestUserAnswersCreatedAt.toString()
    )
    .map((userAnswer) => userAnswer.questionAnswerId)
  return latestUserAnswers
}

module.exports = findUserLatestAnswersIds
