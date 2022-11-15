// Authenticate via API Key
const hubspot = require('@hubspot/api-client')

const SendHubspotMessage = async (
  email,
  group_invite_link,
  user_results_link,
  userQuestionAnswerPairs,
  userRole,
  userChallenge
) => {
  if (!email) {
    throw new Error('Email not provided.')
  }

  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HUBSPOT_API_KEY,
  })

  if (!hubspotClient) {
    throw new Error('Failed to initialise HubSpot connection')
  }

  //  Hubspot properties cant have whitespace or capitals, formatting needed for hubspot
  // comma and whitespace are converted to _ internally in hubspot
  const formattedPairs = userQuestionAnswerPairs.map((item) => ({
    [item.question
      .slice(0, 99)
      .replace(/\./g, '')
      .replace(/\s+/g, '_')
      .replace(/,/g, '_')
      .replace(/[\(\)\”\“]/g, '')
      .replace(/"/g, '')
      .replace(/'/g, '')
      .replace(/:/g, '')
      .replace(/-/g, '_') 
      .toLowerCase()]: item.answer,
  }))

  const questionAnswerProperties = Object.assign({}, ...formattedPairs)

  const contactObj = {
    properties: {
      ...questionAnswerProperties,
      email: email,
      group_invite_link: group_invite_link,
      result_link_for_user: user_results_link,
      last_devops_assessment_survey_submission: new Date().toString(),
      what_challenge_do_you_want_to_solve_: userChallenge,
      what_is_your_role_in_the_company_: userRole,
    },
  }

  try {
    return await hubspotClient.crm.contacts.basicApi.create(contactObj)
  } catch (error) {
    //console.log(error)
    try {
      const filter = {
        propertyName: 'email',
        operator: 'EQ',
        value: email,
      }
      const filterGroup = { filters: [filter] }
      const properties = ['vid', 'email']
      const limit = 100
      const after = 0

      const publicObjectSearchRequest = {
        filterGroups: [filterGroup],
        properties,
        limit,
        after,
      }
      const result = await hubspotClient.crm.contacts.searchApi.doSearch(
        publicObjectSearchRequest
      )
      const { id }  = result.body.results[0]
      return await hubspotClient.crm.contacts.basicApi.update(id, contactObj)
    } catch (innerError) {
      console.log(innerError)
      throw new Error(innerError)
    }
  }
}

module.exports = { SendHubspotMessage }
