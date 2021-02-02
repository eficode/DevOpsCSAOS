/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../app.js')
const { initDatabase } = require('../config/setupDatabase')
const { User } = require('../models')

beforeAll(async () => {
  await initDatabase()
})

describe('GET /api/questions', () => {
  it('has four questions', async (done) => {
    const response = await request(app).get('/api/questions')
    expect(response.body).toHaveLength(4)
    done()
  })
})

describe('GET /api/question/:uuid', () => {
  it('Returns correct data with valid id', async (done) => {
    const response = await request(app).get(
      '/api/question/a4d65e0b-b2c3-426d-91f3-86c2e92bcfcb'
    )
    expect(response.status).toBe(200)
    const question = response.body

    expect(question.text).toBe('Oletko ruisleipä?')
    expect(question.weight).toBe(0.8)
    expect(question.categoryId).toBe(1)
    done()
  })

  it('Returns correct error message with invalid id', async (done) => {
    const response = await request(app).get(
      '/api/question/a4d65e0b-b2c3-426d-91f3-86c2e92bcfcr'
    )
    expect(response.status).toBe(500)
    expect(response.error.text).toBe('That uuid does not exist')
    done()
  })
})

describe('GET /api/categories', () => {
  it('Returns all categories', async (done) => {
    const response = await request(app).get('/api/categories')
    expect(response.status).toBe(200)
    const categories = response.body
    expect(categories.length).toBe(2)

    categories.forEach((category) => {
      expect(category.name).not.toBe(undefined)
    })
    done()
  })
})

describe('GET /api/category/:categoryId', () => {
  it('Returns all questions from category', async (done) => {
    const response = await request(app).get('/api/category/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    done()
  })

  it('Returns empty list with non-existing category', async (done) => {
    const response = await request(app).get('/api/category/97778')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
    done()
  })
})

describe('POST /api/users', () => {
  it('Creates a new user with valid email', async (done) => {
    const userData = { email: 'test@gmail.com' }
    const response = await request(app).post('/api/users').send(userData)
    expect(response.status).toBe(200)
    const newUser = response.body
    const user = await User.findOne({
      where: {
        uuid: newUser.uuid,
      },
    })
    expect(user.dataValues).not.toBe(undefined)
    expect(user.dataValues.email).toBe('test@gmail.com')
    done()
  })
})
