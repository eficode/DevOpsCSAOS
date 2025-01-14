/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../src/app')
const { clearDBAndCreateDummyData } = require('../testUtils/setupTestDb')

beforeAll(async () => {
  await clearDBAndCreateDummyData()
})
const surveyId = 1
describe('GET /api/questions', () => {
  it('has two questions', async (done) => {
    const response = await request(app).get(`/api/questions/${surveyId}`)
    expect(response.body).toHaveLength(2)
    done()
  })
})
