/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { initDatabase } = require('../../config/setupDatabase')

beforeAll(async () => {
  await initDatabase()
})

describe('GET /api/categories', () => {
  it('Returns all categories', async (done) => {
    const response = await request(app).get('/api/categories')
    expect(response.status).toBe(200)
    const categories = response.body
    expect(categories.length).toBe(4)

    categories.forEach((category) => {
      expect(category.name).not.toBe(undefined)
    })
    done()
  })
})

describe('GET /api/categories/:categoryId', () => {
  it('Returns all questions from category', async (done) => {
    const resp = await request(app).get('/api/categories/')
    const categories = resp.body
    const response = await request(app).get(
      `/api/categories/${categories[0].id}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    done()
  })

  it('Returns empty list with non-existing category', async (done) => {
    const response = await request(app).get(
      '/api/categories/a4d65e0b-b2c3-426d-91f3-86c2e92bcfcb'
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
    done()
  })
})
