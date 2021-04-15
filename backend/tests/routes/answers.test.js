/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { clearDBAndCreateDummyData } = require('../../testUtils/setupTestDb')
const { User } = require('../../models')

const survey1TestAnswers = [100, 103]
const survey1Id = 1
const userGroupId = 'f5fd31b0-2315-4757-9794-3c96e7ffb7ec'

beforeEach(async () => {
  await clearDBAndCreateDummyData()
})

describe('POST /api/answers', () => {
  it('Returns 400 if survey id is invalid', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: 3765,
    })
    expect(response.status).toBe(400)

    done()
  })

  it('Returns 400 if group id is invalid', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: survey1Id,
      groupId: 'f5fd31b0-2315-4757-9794-3c96e7faaaaa',
    })
    expect(response.status).toBe(400)

    done()
  })

  it('Valid answers submit returns 200', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    expect(response.status).toBe(200)

    done()
  })

  it('If user submits a valid group id, id is saved to db', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: survey1Id,
      groupId: userGroupId,
    })

    const user = await User.findOne({ where: { groupId: userGroupId } })
    expect(user).not.toBe(undefined)
    expect(response.status).toBe(200)

    done()
  })

  it('Returns correct survey result', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })

    const { results } = response.body
    const {
      surveyResult,
      categories,
      userBestInCategory,
      userWorstInCategory,
    } = results

    expect(surveyResult.text).toBe('Olet ruisleipä')
    expect(categories[0]).toBe('Jauhot')
    expect(userBestInCategory).toBe('Jauhot')
    expect(userWorstInCategory).toBe('Jauhot')

    done()
  })

  it('Returns data in expected form', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    expect(response.status).toBe(200)
    expect(response.body.results).not.toEqual(null)
    const { results } = response.body

    const { surveyResult } = results
    expect(surveyResult.maxPoints).not.toBe(undefined)
    expect(surveyResult.userPoints).not.toBe(undefined)
    expect(surveyResult.text).not.toBe(undefined)

    const { categories, userBestInCategory, userWorstInCategory } = results
    expect(categories.length).toBeGreaterThan(0)
    expect(userBestInCategory).not.toBe(undefined)
    expect(userWorstInCategory).not.toBe(undefined)

    const { token } = response.body
    expect(token).not.toBe(undefined)

    done()
  })
})
