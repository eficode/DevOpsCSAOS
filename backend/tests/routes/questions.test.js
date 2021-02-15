/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { initDatabase } = require('../../config/setupDatabase')

beforeAll(async () => {
  await initDatabase()
})

describe('GET /api/questions', () => {
  it('has four questions', async (done) => {
    const response = await request(app).get('/api/questions')
    expect(response.body).toHaveLength(10)
    done()
  })
})

describe('GET /api/questions/:id', () => {
  it('Returns correct data with valid id', async (done) => {
    const response = await request(app).get(
      '/api/questions/a4d65e0b-b2c3-426d-91f3-86c2e92bcfcb'
    )
    expect(response.status).toBe(200)

    const question = response.body

    expect(question.text).toBe('Oletko ruisleipä?')
    expect(question.weight).toBe(5)
    done()
  })

  it('Returns correct error message with invalid id', async (done) => {
    const response = await request(app).get(
      '/api/questions/a4d65e0b-b2c3-426d-91f3-86c2e92bcfcr'
    )
    expect(response.status).toBe(500)
    expect(response.error.text).toBe('That uuid does not exist')
    done()
  })
})
