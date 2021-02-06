/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../app.js')
const { initDatabase } = require('../config/setupDatabase')

beforeAll(async () => {
  await initDatabase()
})

describe('GET /api/answers', () => {
  it('Returns correct number of answers', async (done) => {
    const response = await request(app).get('/api/answers')
    expect(response.body).toHaveLength(10)
    done()
  })
})

describe('POST /api/answers', () => {
  it('User can submit answers without email', async (done) => {
    const response = await request(app)
      .post('/api/answers')
      .send({
        answers: [
          { questionId: 'a4d65e0b-b2c3-426d-91f3-86c2e92bcfcb', value: 2 },
          { questionId: 'dbfd2098-f95b-4d82-946a-c8c0dcf10423', value: 4 },
        ],
      })
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({ result: `3.6/6.5` })
    done()
  })

  it('User can submit answers with email', async (done) => {
    const response = await request(app)
      .post('/api/answers')
      .send({
        email: 'testv2@gmail.com',
        answers: [
          { questionId: 'a4d65e0b-b2c3-426d-91f3-86c2e92bcfcb', value: 2 },
          { questionId: 'dbfd2098-f95b-4d82-946a-c8c0dcf10423', value: 4 },
        ],
      })
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({ result: `3.6/6.5` })
    done()
  })
})
