/* eslint-disable node/no-unpublished-require */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const jwt = require('jsonwebtoken')
const { clearDBAndCreateDummyData } = require('../testUtils/setupTestDb')
const app = require('../../src/app.js')

const resultsEndpoint = '/api/results'
const submitAnswersEndpoint = '/api/answers'
const submitEmailEndpoint = '/api/answers/emailsubmit'
jest.mock('../../src/controllers/helpers/hubspot')

const survey1TestAnswers = [100, 103] // points: 5 & 10
const survey1TestAnswers2 = [101, 102] // points: 0 & 8
const survey1Id = 1
const userGroupId = '8e081c14-bf9a-41fc-9073-d3dd2eef7c15'
const industryId = 1

const validBodyForAnswersSubmit = {
  answers: survey1TestAnswers,
  surveyId: survey1Id,
}

const validBodyForAnswersSubmitWithGroup1 = {
  answers: survey1TestAnswers,
  surveyId: survey1Id,
  groupId: userGroupId,
}

const validBodyForAnswersSubmitWithGroup2 = {
  answers: survey1TestAnswers2,
  surveyId: survey1Id,
  groupId: userGroupId,
}

const validBodyForEmailSubmit = {
  surveyId: survey1Id,
  token: undefined,
  createNewGroup: false,
  email: 'test1@email.com',
}

const validBodyForEmailSubmitWithIndustry = {
  surveyId: survey1Id,
  token: undefined,
  createNewGroup: false,
  email: 'test112moimoi@email.com',
  industryId,
}

const validBodyForEmailSubmitWithIndustry2 = {
  surveyId: survey1Id,
  token: undefined,
  createNewGroup: false,
  email: 'test123@email.com',
  industryId,
}

describe(`POST ${resultsEndpoint}`, () => {
  const { SECRET_FOR_TOKEN } = process.env

  beforeEach(async () => {
    await clearDBAndCreateDummyData()
  })

  it('Returns 404 if token is missing', async (done) => {
    const response = await request(app).get(resultsEndpoint)
    expect(response.status).toBe(404)
    done()
  })

  it('Returns 401 if there is no user associated with token', async (done) => {
    const invalidUserId = 8
    const badToken = jwt.sign(invalidUserId, SECRET_FOR_TOKEN)
    const response = await request(app).get(`${resultsEndpoint}/${badToken}`)
    expect(response.status).toBe(401)
    done()
  })

  it('Full results data has correct form', async (done) => {
    const answersResponse = await request(app)
      .post(submitAnswersEndpoint)
      .send(validBodyForAnswersSubmit)
    const { token } = answersResponse.body

    await request(app)
      .post(submitEmailEndpoint)
      .send({ ...validBodyForEmailSubmit, token })

    const response = await request(app).get(`${resultsEndpoint}/${token}`)

    expect(response.status).toBe(200)

    const results = response.body
    expect(results.surveyResult.userPoints).not.toBe(undefined)
    expect(results.surveyResult.text).not.toBe(undefined)
    expect(results.surveyResult.maxPoints).not.toBe(undefined)

    expect(results.categoryResults.length).toBe(1)
    expect(results.categoryResults[0].name).not.toBe(undefined)
    expect(results.categoryResults[0].id).not.toBe(undefined)
    expect(results.categoryResults[0].description).not.toBe(undefined)
    expect(results.categoryResults[0].userPoints).not.toBe(undefined)
    expect(results.categoryResults[0].maxPoints).not.toBe(undefined)
    expect(results.categoryResults[0].text).not.toBe(undefined)
    done()
  })

  it('If no user group id is given, group average does not exist in results', async (done) => {
    const answersResponse = await request(app)
      .post(submitAnswersEndpoint)
      .send(validBodyForAnswersSubmit)
    const { token } = answersResponse.body

    await request(app)
      .post(submitEmailEndpoint)
      .send({ ...validBodyForEmailSubmit, token })

    const response = await request(app).get(`${resultsEndpoint}/${token}`)
    const results = response.body
    expect(results.surveyResult.groupAverage).toBe(undefined)

    done()
  })

  it('If user group id is given, group averages per category are added to result', async (done) => {
    const answersResponse = await request(app)
      .post(submitAnswersEndpoint)
      .send(validBodyForAnswersSubmitWithGroup1)
    const { token } = answersResponse.body

    // send another answer set to check average computing
    await request(app)
      .post(submitAnswersEndpoint)
      .send(validBodyForAnswersSubmitWithGroup2)

    await request(app)
      .post(submitEmailEndpoint)
      .send({ ...validBodyForEmailSubmit, token })

    const response = await request(app).get(`${resultsEndpoint}/${token}`)

    const results = response.body
    expect(results.categoryResults[0].groupAverage).not.toBe(undefined)
    expect(results.categoryResults[0].groupAverage).toBe(11.5)
    done()
  })

  it('If no industry id is given, industry average does not exist in results', async (done) => {
    const answersResponse = await request(app)
      .post(submitAnswersEndpoint)
      .send(validBodyForAnswersSubmit)
    const { token } = answersResponse.body

    await request(app)
      .post(submitEmailEndpoint)
      .send({ ...validBodyForEmailSubmit, token })

    const response = await request(app).get(`${resultsEndpoint}/${token}`)
    const results = response.body
    expect(results.surveyResult.industryAverage).toBe(undefined)

    done()
  })

  it('If industry id is given, industry averages per category are added to result', async (done) => {
    const answersResponse = await request(app)
      .post(submitAnswersEndpoint)
      .send(validBodyForAnswersSubmit)
    const { token } = answersResponse.body

    await request(app)
      .post(submitEmailEndpoint)
      .send({ ...validBodyForEmailSubmitWithIndustry, token })

    // send another answer set to check average computing
    const answersResponse2 = await request(app)
      .post(submitAnswersEndpoint)
      .send(validBodyForAnswersSubmitWithGroup2)

    const { token: token2 } = answersResponse2.body

    await request(app)
      .post(submitEmailEndpoint)
      .send({ ...validBodyForEmailSubmitWithIndustry2, token: token2 })

    const response = await request(app).get(`${resultsEndpoint}/${token}`)
    const results = response.body
    expect(results.categoryResults[0].industryAverage).not.toBe(undefined)
    expect(results.categoryResults[0].industryAverage).toBe(11.5)
    done()
  })
})
