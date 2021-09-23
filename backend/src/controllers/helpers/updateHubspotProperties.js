// Authenticate via API Key
const hubspot = require('@hubspot/api-client')
const { Question, Question_answer } = require('../../../models')

const updateHubspotProperties = async () => {
  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HUBSPOT_API_KEY,
  })

  if (!hubspotClient) {
    throw new Error('Failed to initialise HubSpot connection')
  }
  let questions = []

  try {
    questions = await Question.findAll({
      attributes: ['text'],
      include: [
        {
          model: Question_answer,
          attributes: ['id', 'text'],
        },
      ],
      nest: true,
    })
  } catch (e) {
    console.log('error', e)
  }

  // Hubspot properties cant have whitespace or capitals and they have maximum length of 100
  // comma and whitespace are converted to _ internally in hubspot

  const formattedQuestionNames = questions.map((item) => ({
    [item.text
      .substring(0, 100)
      .replace(/\./g, '')
      .replace(/\s+/g, '_')
      .replace(/,/g, '_')
      .toLowerCase()]: item.text,
    answerOptions: item.Question_answers.map((answer) => answer.text),
  }))

  await formattedQuestionNames.forEach(async (e) => {
    const answerOptionsForProperties = e.answerOptions.map((option) => ({
      label: option,
      value: option,
    }))

    const propertyCreate = {
      name: Object.keys(e)[0],
      label: Object.values(e)[0],
      type: 'enumeration',
      fieldType: 'select',
      groupName: 'devops_capability_self-assessment_online_survey',
      description:
        'This property originated from the survey tool. Specific survey equal to property group.',
      options: answerOptionsForProperties,
      hasUniqueValue: false,
      hidden: false,
      formField: true,
    }
    const objectType = 'Contact'
    try {
      await hubspotClient.crm.properties.coreApi.create(
        objectType,
        propertyCreate
      )
      console.log(`property '${propertyCreate.label}' created`)
    } catch (error) {
      // console.log('error', error.response.body.message)
      console.log(`property '${propertyCreate.label}' already existed`)
    }
  })
}

const getRolesFromHubspot = async () => {
  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HUBSPOT_API_KEY,
  })
  console.log('fetch roles')
  const objectType = 'Contact'
  const propertyName = 'what_is_your_role_in_the_company_'
  const archived = false
  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(
      objectType,
      propertyName,
      archived
    )
    console.log(JSON.stringify(apiResponse.body, null, 2))
    return apiResponse
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

const getChallengesFromHubspot = async () => {
  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HUBSPOT_API_KEY,
  })
  console.log('fetch challenges')
  const objectType = 'Contact'
  const propertyName = 'what_challenge_do_you_want_to_solve_'
  const archived = false
  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(
      objectType,
      propertyName,
      archived
    )
    console.log(JSON.stringify(apiResponse.body, null, 2))
    return apiResponse
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

module.exports = { updateHubspotProperties }
