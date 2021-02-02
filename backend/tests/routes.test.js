/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../app.js')
const { initDatabase } = require('../config/setupDatabase')

describe('GET /api/questions', () => {
  it('has four questions', async (done) => {
    await initDatabase()
    const response = await request(app).get('/api/questions')
    expect(response.body).toHaveLength(4)
    done()
  })
})

describe('GET /api/question/:id', () => {
  it('Returns correct data with valid id', async (done) => {
    const response = await request(app).get('/api/question/1')
    expect(response.status).toBe(200)
    const question = response.body

    expect(question.text).toBe('Oletko ruisleipä?')
    expect(question.weight).toBe(0.8)
    expect(question.categoryId).toBe(1)
    done()
  })
})
