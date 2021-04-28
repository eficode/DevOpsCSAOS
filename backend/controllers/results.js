const resultsRouter = require('express').Router()
const { getFullResults } = require('./helpers/answers')

resultsRouter.get('/:userid', async (req, res) => {
  // fetch users' newest set of answers + survey id
  // calculate full results
  // find users' group n industry ids, if they exist calculate averages (group ave calculating in usergroups router)
  // append averages to full results data and return
})

module.exports = resultsRouter
