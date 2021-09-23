const helperRouter = require('express').Router()
const { getRolesFromHubspot } = require('./helpers/getRolesFromHubspot')
const {
  getChallengesFromHubspot,
} = require('./helpers/getChallengesFromHubspot')

helperRouter.get('/get-roles-and-challenges', async (req, res) => {
  try {
    const roles = await getRolesFromHubspot()
    const challenges = await getChallengesFromHubspot()

    return res.status(200).json({ roles: roles, challenges: challenges })
  } catch (e) {
    return res.status(500).json({ error: 'Unable to return location URL' })
  }
})

helperRouter.get('/get-location', async (req, res) => {
  try {
    return res.status(200).json(process.env.BASE_URL_FOR_EMAILS)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to return location URL' })
  }
})

module.exports = helperRouter
