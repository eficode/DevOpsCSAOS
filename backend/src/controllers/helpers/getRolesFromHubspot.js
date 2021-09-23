// Authenticate via API Key
const hubspot = require('@hubspot/api-client')

const getRolesFromHubspot = async () => {
  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HUBSPOT_API_KEY,
  })
  const objectType = 'Contact'
  const propertyName = 'what_is_your_role_in_the_company_'
  const archived = false
  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(
      objectType,
      propertyName,
      archived
    )
    
    const rolePropertyValuesTmp = apiResponse.body.options.map((option) => {
      return option.value
    })

    const rolePropertyValues = rolePropertyValuesTmp.filter(value => value !== '')
    
    return rolePropertyValues
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

module.exports = { getRolesFromHubspot }