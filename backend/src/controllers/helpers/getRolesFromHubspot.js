// Authenticate via API Key
const hubspot = require('@hubspot/api-client')

const getRolesFromHubspot = async () => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_API_KEY,
  })
  const objectType = 'Contact'
  const propertyName = 'what_is_your_role_in_the_company_'
  const archived = false
  let rolePropertyValues
  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(
      objectType,
      propertyName,
      archived
    )

    const rolePropertyValuesTmp = apiResponse.body.options.map(
      (option) => option.value
    )

    rolePropertyValues = rolePropertyValuesTmp.filter((value) => value !== '')
  } catch (e) {
    console.error(e)
  }
  return rolePropertyValues
}

module.exports = { getRolesFromHubspot }
