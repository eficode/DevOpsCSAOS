// Authenticate via API Key
const hubspot = require('@hubspot/api-client')

const getChallengesFromHubspot = async () => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_API_KEY,
  })
  const objectType = 'Contact'
  const propertyName = 'what_challenge_do_you_want_to_solve_'
  const archived = false
  let challengePropertyValues
  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(
      objectType,
      propertyName,
      archived
    )

    challengePropertyValues = apiResponse.body.options.map(
      (option) => option.value
    )

    return challengePropertyValues
  } catch (e) {
    console.error(e)
  }
  return challengePropertyValues
}

module.exports = { getChallengesFromHubspot }
