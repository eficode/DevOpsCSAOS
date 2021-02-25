/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { initDatabase } = require('../../config/setupDatabase')

const testAnswers = [
  {
    questionId: 'a4d65e0b-b2c3-426d-91f3-86c2e92bcfcb',
    value: 2,
  },
  {
    questionId: 'dbfd2098-f95b-4d82-946a-c8c0dcf10423',
    value: 1,
  },
  {
    questionId: '1675ec77-5a78-4318-a414-2545d9f068e3',
    value: 3,
  },
  {
    questionId: 'deea43fc-06ba-4aed-bc0d-fea0991aa05f',
    value: 4,
  },
  {
    questionId: 'faf69b1c-66d5-11eb-ae93-0242ac130002',
    value: 4,
  },
  {
    questionId: 'f9f3e2b1-3ed3-46df-8c9c-4cef635697fa',
    value: 4,
  },
  {
    questionId: '59431e74-0ae6-4def-a87b-4fae82514187',
    value: 4,
  },
  {
    questionId: '6eb134f0-65fa-44bc-baad-14f0eeb0d743',
    value: 4,
  },
  {
    questionId: '7da6e20b-53e7-4efa-92d3-ef88f0ec1169',
    value: 4,
  },
  {
    questionId: 'd254d70b-f26b-44f6-a48b-44b3435e0a26',
    value: 4,
  },
]

const testAnswers2 = [
  {
    questionId: 'a4d65e0b-b2c3-426d-91f3-86c2e92bcfcb',
    value: 4,
  },
  {
    questionId: 'dbfd2098-f95b-4d82-946a-c8c0dcf10423',
    value: 3,
  },
  {
    questionId: '1675ec77-5a78-4318-a414-2545d9f068e3',
    value: 3,
  },
  {
    questionId: 'deea43fc-06ba-4aed-bc0d-fea0991aa05f',
    value: 4,
  },
  {
    questionId: 'faf69b1c-66d5-11eb-ae93-0242ac130002',
    value: 4,
  },
  {
    questionId: 'f9f3e2b1-3ed3-46df-8c9c-4cef635697fa',
    value: 4,
  },
  {
    questionId: '59431e74-0ae6-4def-a87b-4fae82514187',
    value: 4,
  },
  {
    questionId: '6eb134f0-65fa-44bc-baad-14f0eeb0d743',
    value: 4,
  },
  {
    questionId: '7da6e20b-53e7-4efa-92d3-ef88f0ec1169',
    value: 4,
  },
  {
    questionId: 'd254d70b-f26b-44f6-a48b-44b3435e0a26',
    value: 4,
  },
]

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
    const response = await request(app).post('/api/answers').send({
      answers: testAnswers,
    })
    expect(response.status).toBe(200)
    expect(response.body.results).not.toEqual(null)
    expect(response.body.results.length).toEqual(4)
    done()
  })

  it('User can submit answers with new email', async (done) => {
    const response = await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: testAnswers,
    })
    expect(response.status).toBe(200)
    expect(response.body.results).not.toEqual(null)
    expect(response.body.results.length).toEqual(4)
    done()
  })
  it('User can submit answers with existing email', async (done) => {
    const response1 = await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: testAnswers,
    })

    const response2 = await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: testAnswers2,
    })
    expect(response2.status).toBe(200)
    expect(response2.body.results).not.toEqual(null)
    expect(response2.body.results.length).toEqual(4)
    expect(response1.body.results[0].userResult).not.toEqual(response2.body.results[0].userResult)
    done()
  })
  it('Returns data in expected form', async (done) => {
    const response = await request(app).post('/api/answers').send({
      email: 'test100@gmail.com',
      answers: testAnswers,
    })
    expect(response.status).toBe(200)
    expect(response.body.results).not.toEqual(null)
    const { results } = response.body
    results.forEach((categoryResult) => {
      expect(categoryResult.categoryId).not.toEqual(null)
      expect(categoryResult.maxCategoryResult).not.toEqual(null)
      expect(categoryResult.userResult).not.toEqual(null)
    })
    done()
  })
})
