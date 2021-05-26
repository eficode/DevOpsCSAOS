/* eslint-disable node/no-unpublished-require */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest')
const jwt = require('jsonwebtoken')
const { clearDBAndCreateDummyData } = require('../testUtils/setupTestDb')
const app = require('../../app.js')
const { Survey_user_group, User_answer, User } = require('../../models')

const endpoint = '/api/answers/emailsubmit'
jest.mock('../../controllers/helpers/hubspot')

describe(`POST ${endpoint}`, () => {
  const { SECRET_FOR_TOKEN } = process.env
  const validEmail = 'abcdefg@gmail.com'
  // all from test data
  const surveyId = 1
  const validUserId = 100
  const survey1TestAnswers = [101, 102]
  //
  const validToken = jwt.sign(validUserId, SECRET_FOR_TOKEN)
  const validBody = {
    surveyId,
    token: validToken,
    email: validEmail,
  }

  beforeEach(async () => {
    await clearDBAndCreateDummyData()
  })

  it('Returns 400 if email is missing', async (done) => {
    const bodyWithoutEmail = {
      ...validBody,
      email: undefined,
    }
    const response = await request(app).post(endpoint).send(bodyWithoutEmail)
    expect(response.status).toBe(400)
    done()
  })

  it('Returns 401 if there is no user associated with token', async (done) => {
    const invalidUserId = 12345
    const badToken = jwt.sign(invalidUserId, SECRET_FOR_TOKEN)
    const bodyWithBadToken = {
      ...validBody,
      token: badToken,
    }
    const response = await request(app).post(endpoint).send(bodyWithBadToken)
    expect(response.status).toBe(401)
    done()
  })

  it('Valid body returns status code 200', async (done) => {
    const response = await request(app).post(endpoint).send(validBody)
    expect(response.status).toBe(200)
    done()
  })

  it('if createNewGroup is set, a new user group is created', async (done) => {
    const validBodyWithCreateGroupTrue = {
      ...validBody,
      createNewGroup: true,
    }
    const surveyUserGroupsBeforeRequest = await (
      await Survey_user_group.findAll({})
    ).length
    await request(app).post(endpoint).send(validBodyWithCreateGroupTrue)
    const surveyUserGroupsAfterRequest = await (
      await Survey_user_group.findAll({})
    ).length
    expect(surveyUserGroupsAfterRequest).toBe(surveyUserGroupsBeforeRequest + 1)
    done()
  })

  it('If user submits email and groupId existing in db, answers are attached to the existing user', async (done) => {
    // from test data
    const existingUserId = 20
    const existingUserEmail = 'testaaja2@email.com'
    const existingUserGroupId = 'f5fd31b0-2315-4757-9794-3c96e7ffb7ec'
    const answersResponse = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: surveyId,
      groupId: existingUserGroupId,
    })
    const { token: anonymousUserToken } = answersResponse.body
    const validBodyWithExistingEmail = {
      ...validBody,
      token: anonymousUserToken,
      email: existingUserEmail,
      groupId: existingUserGroupId,
    }
    await request(app).post(endpoint).send(validBodyWithExistingEmail)
    const userAnswersAfterRequest = await User_answer.findAll({
      where: {
        userId: existingUserId,
      },
    })
    expect(userAnswersAfterRequest.length).toBe(4)
    done()
  })

  it('If user submits email and groupId with old answers in db, old answers persist in db', async (done) => {
    const existingUserId = 20
    const existingUserEmail = 'testaaja2@email.com'
    const existingUserGroupId = 'f5fd31b0-2315-4757-9794-3c96e7ffb7ec'
    const answersResponse = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: surveyId,
      groupId: existingUserGroupId,
    })
    const { token: anonymousUserToken } = answersResponse.body
    const validBodyWithExistingEmail = {
      ...validBody,
      token: anonymousUserToken,
      email: existingUserEmail,
      groupId: existingUserGroupId,
    }
    await request(app).post(endpoint).send(validBodyWithExistingEmail)
    const userAnswersAfterRequest = await User_answer.findAll({
      where: {
        userId: existingUserId,
      },
    })
    expect(userAnswersAfterRequest[0].questionAnswerId).toBe(100)
    expect(userAnswersAfterRequest[1].questionAnswerId).toBe(103)
    done()
  })

  it('If user submits email and groupId existing in db, anonymous default user is removed', async (done) => {
    const existingUserEmail = 'testaaja2@email.com'
    const existingUserGroupId = 'f5fd31b0-2315-4757-9794-3c96e7ffb7ec'
    const answersResponse = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: surveyId,
      groupId: existingUserGroupId,
    })
    const { token: anonymousUserToken } = answersResponse.body
    const validBodyWithExistingEmailAndGroupId = {
      ...validBody,
      token: anonymousUserToken,
      email: existingUserEmail,
      groupId: existingUserGroupId,
    }
    const anonymousUserId = jwt.verify(anonymousUserToken, SECRET_FOR_TOKEN)
    await request(app).post(endpoint).send(validBodyWithExistingEmailAndGroupId)
    const anonymousUser = await User.findOne({
      where: {
        id: anonymousUserId,
      },
    })
    expect(anonymousUser).toBe(null)
    done()
  })

  it('If user submits existing email and wants to create a new group, new group is created', async (done) => {
    const existingUserEmail = 'testaaja2@email.com'
    const answersResponse = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: surveyId,
    })
    const { token: anonymousUserToken } = answersResponse.body
    const validBodyWithExistingEmail = {
      ...validBody,
      token: anonymousUserToken,
      email: existingUserEmail,
      createNewGroup: true,
    }
    const userGroupsBeforeRequest = await Survey_user_group.findAll()
    await request(app).post(endpoint).send(validBodyWithExistingEmail)
    const userGroupsAfterRequest = await Survey_user_group.findAll()
    expect(userGroupsAfterRequest.length).toBe(
      userGroupsBeforeRequest.length + 1
    )
    done()
  })

  it('If user submits new email and wants to create a new group, new group is created and email is attached to anonymous user', async (done) => {
    const newEmail = 'testaaja50@email.com'
    const answersResponse = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: surveyId,
    })
    const { token: anonymousUserToken } = answersResponse.body
    const validBodyWithExistingEmail = {
      ...validBody,
      token: anonymousUserToken,
      email: newEmail,
      createNewGroup: true,
    }
    const userGroupsBeforeRequest = await Survey_user_group.findAll()
    await request(app).post(endpoint).send(validBodyWithExistingEmail)
    const userGroupsAfterRequest = await Survey_user_group.findAll()
    expect(userGroupsAfterRequest.length).toBe(
      userGroupsBeforeRequest.length + 1
    )
    const anonymousUserId = jwt.verify(anonymousUserToken, SECRET_FOR_TOKEN)
    const updatedUser = await User.findOne({ where: { id: anonymousUserId } })
    expect(updatedUser.email).toBe(newEmail)
    done()
  })

  it('If user submits industry id, industry information is saved to db', async (done) => {
    const newEmail = 'testaajamme@email.com'

    const answersResponse = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: surveyId,
    })
    const { token: anonymousUserToken } = answersResponse.body

    const validBodyWithExistingEmail = {
      ...validBody,
      token: anonymousUserToken,
      email: newEmail,
      createNewGroup: false,
      industryId: 1,
    }
    await request(app).post(endpoint).send(validBodyWithExistingEmail)

    const anonymousUserId = jwt.verify(anonymousUserToken, SECRET_FOR_TOKEN)
    const updatedUser = await User.findOne({ where: { id: anonymousUserId } })
    expect(updatedUser.industryId).toBe(1)
    done()
  })

  it('Returns 400 if user submits industry id not existing in db', async (done) => {
    const newEmail = 'testaajamme@email.com'

    const answersResponse = await request(app).post('/api/answers').send({
      answers: survey1TestAnswers,
      surveyId: surveyId,
    })
    const { token: anonymousUserToken } = answersResponse.body

    const validBodyWithExistingEmail = {
      ...validBody,
      token: anonymousUserToken,
      email: newEmail,
      createNewGroup: false,
      industryId: 123456789,
    }
    const response = await request(app)
      .post(endpoint)
      .send(validBodyWithExistingEmail)
    expect(response.status).toBe(400)
    done()
  })
})
