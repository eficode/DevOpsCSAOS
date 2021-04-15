const hubspotRouter = require('express').Router()
//Authenticate via API Key
const hubspot = require('@hubspot/api-client')

const hubspotClient = new hubspot.Client({
  apiKey: process.env.HUBSPOT_API_KEY,
})

if (!hubspotClient) {
  throw new Error('Failed to initialise HubSpot connection')
}

hubspotRouter.post('/contact', async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new Error('Email not provided.')
  }

  const contactObj = {
    properties: {
      email,
      group_invite_link: req.body.group_invite_link || '',
      group_results_page_link: req.body.group_results_page_link || '',
    },
  }

  try {
    return await hubspotClient.crm.contacts.basicApi.create(contactObj)
  } catch (error) {
    console.error(error)
  }
})

module.exports = hubspotRouter
