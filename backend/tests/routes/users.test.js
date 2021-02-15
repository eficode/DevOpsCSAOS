/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { initDatabase } = require('../../config/setupDatabase')
const { User } = require('../../models')

beforeAll(async () => {
  await initDatabase()
})

describe('GET /api/users', () => {
  it('Returns correct number of users', async (done) => {
    const response = await request(app).get('/api/users')
    expect(response.body).toHaveLength(2)
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
        id: newUser.id,
      },
    })
    expect(user.dataValues).not.toBe(undefined)
    expect(user.dataValues.email).toBe('test@gmail.com')
    done()
  })

  it('Doesnt create user with invalid email', async (done) => {
    const userData = { email: 'testgmail.com' }
    const response = await request(app).post('/api/users').send(userData)
    expect(response.status).toBe(500)

    expect(response.body.errors[0].type).toBe('Validation error')

    done()
  })
})

describe('GET /api/users', () => {
  it('Returns correct number of users after creating a new user', async (done) => {
    const response = await request(app).get('/api/users')
    expect(response.body).toHaveLength(3)
    done()
  })
})
