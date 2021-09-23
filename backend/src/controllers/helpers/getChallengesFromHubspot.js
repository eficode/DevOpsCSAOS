// Authenticate via API Key
const hubspot = require('@hubspot/api-client')

const getChallengesFromHubspot = async () => {
  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HUBSPOT_API_KEY,
  })
  const objectType = 'Contact'
  const propertyName = 'what_challenge_do_you_want_to_solve_'
  const archived = false
  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(
      objectType,
      propertyName,
      archived
    )
    
    const challengePropertyValues = apiResponse.body.options.map((option) => {
      return option.value
    })

    return challengePropertyValues
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

module.exports = { getChallengesFromHubspot }