/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { initDatabase } = require('../../config/setupDatabase')

beforeAll(async () => {
  await initDatabase()
})
const surveyId = 1
describe('GET /api/questions', () => {
  it('has two questions', async (done) => {
    const response = await request(app).get(`/api/questions/${surveyId}`)
    expect(response.body).toHaveLength(2)
    done()
  })
})


