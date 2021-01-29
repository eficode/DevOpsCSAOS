const request = require('supertest')
const app = require('../app.js')

describe('GET /api/questions', () => {
  it('has four questions', async (done) => {
    const response = await request(app).get('/api/questions')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(4)
    done()
  })
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)) // wait for 500 ms for async tasks to finish
  })
})
