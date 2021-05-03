// Authenticate via API Key
const hubspot = require('@hubspot/api-client')

const SendHubspotMessage = async (
  email,
  group_invite_link,
  group_results_page_link
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

  const emailparts = email.split('@')
  emailparts[0] = `${emailparts[0]}+${Math.floor(Math.random() * 100001)}@`
  const emailWithRandomNumber = `${emailparts[0]}${emailparts[1]}`
  const contactObj = {
    properties: {
      email,
      email: emailWithRandomNumber,
      group_invite_link: group_invite_link,
      group_results_page_link: group_results_page_link || '',
    },
  }

  try {
    return await hubspotClient.crm.contacts.basicApi.create(contactObj)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { SendHubspotMessage }
