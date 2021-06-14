const { verifyUserAnswers } = require('./verifyUserAnswers')
const { deleteUserSurveyAnswers } = require('./deleteUserAnswers')
const { getFullResults, getSummaryOfResults, calculatePointsNewStyle } = require('./getResults')

module.exports = {
  verifyUserAnswers,
  deleteUserSurveyAnswers,
  getFullResults,
  getSummaryOfResults,
  calculatePointsNewStyle,
}
