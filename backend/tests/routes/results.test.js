/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { initDatabase } = require('../../config/setupDatabase')

beforeAll(async () => {
  await initDatabase()
})

describe('GET /api/results', () => {
  it('Returns correct number of results', async (done) => {
    const response = await request(app).get('/api/results')
    expect(response.body).toHaveLength(4)
    done()
  })
})

describe('POST /api/results', () => {
  it('Returns data in expected form', async (done) => {
    const response = await request(app).post('/api/results').send({
      score: 81,
    })
    expect(response.status).toBe(200)
    expect(response.body.resultText).not.toEqual(null)
    expect(response.body.resultText).toContain('Olet')
    done()
  })
})
