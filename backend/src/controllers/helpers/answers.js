const { verifyUserAnswers } = require('./verifyUserAnswers')
const { deleteUserSurveyAnswers } = require('./deleteUserAnswers')
const { getFullResults, getSummaryOfResults } = require('./getResults')

module.exports = {
  verifyUserAnswers,
  deleteUserSurveyAnswers,
  getFullResults,
  getSummaryOfResults,
}
