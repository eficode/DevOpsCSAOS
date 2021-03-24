/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const app = require('../../app.js')
const { initDatabase } = require('../../config/setupDatabase')
const { clearDBAndCreateDummyData } = require('../../testUtils/setupTestDb')
const { Question, User, User_answer, Question_answer } = require('../../models')

const survey1TestAnswers = [100, 103]
const survey1TestAnswers2 = [101, 102]
const survey2TestAnswers = [200, 202]
const survey1Id = 1
const survey2Id = 2

beforeAll(async () => {
  await clearDBAndCreateDummyData()
})

describe('POST /api/answers', () => {
  it('User can submit answers without email', async (done) => {
    const response = await request(app).post('/api/answers').send({
      user_answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    expect(response.status).toBe(200)

    done()
  })

  it('User can submit answers with new email', async (done) => {
    const response = await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      user_answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    expect(response.status).toBe(200)
    done()
  })

  it('User can submit answers with existing email', async (done) => {
    const response1 = await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      user_answers: survey1TestAnswers,
      surveyId: survey1Id,
    })

    const response2 = await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      user_answers: survey1TestAnswers2,
      surveyId: survey1Id,
    })

    expect(response2.status).toBe(200)

    expect(response1.body.results.surveyResult.userPoints).not.toEqual(
      response2.body.results.surveyResult.userPoints
    )
    done()
  })

  it('User has only one answer set in database per survey', async (done) => {
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      user_answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    const user = await User.findOne({ where: { email: 'testv2@gmail.com' } })
    const firstAnswers = await User_answer.findAll({
      where: { userId: user.id },
    })
    expect(firstAnswers.length).toEqual(2)
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      user_answers: survey1TestAnswers2,
      surveyId: survey1Id,
    })
    const secondAnswers = await User_answer.findAll({
      where: { userId: user.id },
    })
    expect(secondAnswers.length).toEqual(2)
    done()
  })

  it('Same user can have many answer sets: one answer set per survey', async (done) => {
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      user_answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    const user = await User.findOne({ where: { email: 'testv2@gmail.com' } })
    const firstAnswers = await User_answer.findAll({
      where: { userId: user.id },
    })
    expect(firstAnswers.length).toEqual(2)
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      user_answers: survey2TestAnswers,
      surveyId: survey2Id,
    })

    const secondAnswers = await User_answer.findAll({
      where: { userId: user.id },
    })
    expect(secondAnswers.length).toEqual(4)
    done()
  })

  it('If user answers to already answered survey, answers are updated', async (done) => {
    await request(app).post('/api/answers').send({
      email: 'testv2@gmail.com',
      user_answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    const user = await User.findOne({ where: { email: 'testv2@gmail.com' } })

    const allUserAnswers = await User_answer.findAll({
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

    const survey1AnswersInDatabase = allUserAnswers.filter(
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
      user_answers: survey1TestAnswers2,
      surveyId: survey1Id,
    })

    const newUserAnswers = await User_answer.findAll({
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

    const survey1NewAnswersInDatabase = newUserAnswers.filter(
      (user_answer) =>
        user_answer.Question_answer.Question.surveyId === survey1Id
    )

    survey1TestAnswers.forEach((answer) =>
      expect(
        survey1NewAnswersInDatabase.find(
          (answerInDatabase) => answerInDatabase.Question_answer.id === answer
        )
      ).toBe(undefined)
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
      user_answers: survey1TestAnswers,
      surveyId: survey1Id,
    })

    const { results } = response.body
    const { surveyResult } = results

    expect(surveyResult.text).toBe('Olet ruisleipä')

    done()
  })

  it('Returns data in expected form', async (done) => {
    const response = await request(app).post('/api/answers').send({
      email: 'test100@gmail.com',
      user_answers: survey1TestAnswers,
      surveyId: survey1Id,
    })
    expect(response.status).toBe(200)
    expect(response.body.results).not.toEqual(null)
    const { results } = response.body

    const { surveyResult } = results
    expect(surveyResult.maxPoints).not.toBe(undefined)
    expect(surveyResult.userPoints).not.toBe(undefined)
    expect(surveyResult.text).not.toBe(undefined)

    const { categoryResults } = results
    expect(categoryResults.length).toBeGreaterThan(0)

    categoryResults.forEach((categoryResult) => {
      expect(categoryResult.id).not.toEqual(undefined)
      expect(categoryResult.name).not.toEqual(undefined)
      expect(categoryResult.userPoints).not.toEqual(undefined)
      expect(categoryResult.maxPoints).not.toEqual(undefined)
    })
    done()
  })
})
