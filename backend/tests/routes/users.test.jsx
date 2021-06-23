/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../src/app.js')
const { clearDBAndCreateDummyData } = require('../testUtils/setupTestDb')
const { User } = require('../../models')

beforeAll(async () => {
  await clearDBAndCreateDummyData()
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
