/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { clearDBAndCreateDummyData } = require('../../testUtils/setupTestDb')
const { Question, User, User_answer, Question_answer } = require('../../models')

const survey1TestAnswers = [100, 103]
const survey1TestAnswers2 = [101, 102]
const survey2TestAnswers = [200, 202]
const survey1Id = 1
const survey2Id = 2
const userGroupUrl = 'testgroupId'
const userGroupId = 1

beforeEach(async () => {
  await clearDBAndCreateDummyData()
})

describe('POST /api/answers', () => {
  it('Returns 500 if survey id is invalid', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: 3765,
    })
    expect(response.status).toBe(500)

    done()
  })

  it('Returns 500 if group id is invalid', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: survey1Id,
      groupId: 'dsafewgewf',
    })
    expect(response.status).toBe(500)

    done()
  })

  it('User can submit answers without email', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    expect(response.status).toBe(200)

    done()
  })

  it('User can submit answers with new email', async (done) => {
    const response = await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    expect(response.status).toBe(200)
    done()
  })

  it('User can submit answers with existing email', async (done) => {
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })

    const response2 = await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey1TestAnswers2,
      surveyId: survey1Id,
    })

    expect(response2.status).toBe(200)

    done()
  })

  it('If user submits a valid group id, id is saved to db', async (done) => {
    const response = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: survey1Id,
      groupId: userGroupUrl,
    })

    const user = await User.findOne({ where: { groupId: userGroupId } })
    expect(user).not.toBe(undefined)
    expect(response.status).toBe(200)

    done()
  })

  it('If user submits survey many times all answers are saved', async (done) => {
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    const user = await User.findOne({ where: { email: 'testv2@gmail.com' } })
    const firstAnswers = await User_answer.findAll({
      where: { userId: user.id },
    })
    expect(firstAnswers.length).toEqual(2)
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey1TestAnswers2,
      surveyId: survey1Id,
    })
    const secondAnswers = await User_answer.findAll({
      where: { userId: user.id },
    })
    expect(secondAnswers.length).toEqual(4)
    done()
  })

  it('Same user can have many answer sets', async (done) => {
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    const user = await User.findOne({ where: { email: 'testv2@gmail.com' } })
    const firstAnswers = await User_answer.findAll({
      where: { userId: user.id },
    })
    expect(firstAnswers.length).toEqual(2)
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey2TestAnswers,
      surveyId: survey2Id,
    })

    const secondAnswers = await User_answer.findAll({
      where: { userId: user.id },
    })
    expect(secondAnswers.length).toEqual(4)
    done()
  })

  it('If user answers to already answered survey, old answers are not overwritten', async (done) => {
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    const user = await User.findOne({ where: { email: 'testv2@gmail.com' } })

    const allanswers = await User_answer.findAll({
      attributes: ['id'],
      include: [
        {
          model: Question_answer,
          attributes: ['text', 'id'],
          include: [
            {
              model: Question,
              attributes: ['id', 'surveyId'],
            },
          ],
        },
      ],
      where: {
        userId: user.id,
      },
      raw: true,
      nest: true,
    })

    const survey1AnswersInDatabase = allanswers.filter(
      (user_answer) =>
        user_answer.Question_answer.Question.surveyId === survey1Id
    )

    survey1TestAnswers.forEach((answer) =>
      expect(
        survey1AnswersInDatabase.find(
          (answerInDatabase) => answerInDatabase.Question_answer.id === answer
        )
      ).not.toBe(undefined)
    )
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      answers: survey1TestAnswers2,
      surveyId: survey1Id,
    })

    const newanswers = await User_answer.findAll({
      attributes: ['id'],
      include: [
        {
          model: Question_answer,
          attributes: ['text', 'id'],
          include: [
            {
              model: Question,
              attributes: ['id', 'surveyId'],
            },
          ],
        },
      ],
      where: {
        userId: user.id,
      },
      raw: true,
      nest: true,
    })

    const survey1NewAnswersInDatabase = newanswers.filter(
      (user_answer) =>
        user_answer.Question_answer.Question.surveyId === survey1Id
    )

    survey1TestAnswers.forEach((answer) =>
      expect(
        survey1NewAnswersInDatabase.find(
          (answerInDatabase) => answerInDatabase.Question_answer.id === answer
        )
      ).not.toBe(undefined)
    )

    survey1TestAnswers2.forEach((answer) =>
      expect(
        survey1NewAnswersInDatabase.find(
          (answerInDatabase) => answerInDatabase.Question_answer.id === answer
        )
      ).not.toBe(undefined)
    )
    done()
  })

  it('Returns correct survey result', async (done) => {
    const response = await request(app).post('/api/answers').send({
      email: 'test100@gmail.com',
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
      email: 'test100@gmail.com',
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
