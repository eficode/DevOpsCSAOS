/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const { clearDBAndCreateDummyData } = require('../testUtils/setupTestDb')

beforeEach(async () => {
  await clearDBAndCreateDummyData()
})

describe('POST /api/emailsubmit', () => {
  it('Returns 400 if email is missing', async (done) => {
    done()
  })

  it('Returns 400 if there is no user associated with token', async (done) => {
    done()
  })

  it('if createNewGroup is set, a new user group is created', async (done) => {
    done()
  })

  it('Successful email submit returns 200', async (done) => {
    done()
  })

  it('If user submits email existing in db, answers are attached to the existing user ', async (done) => {
    done()
  })

  it('If user submits email existing in db, old answers persist in db', async (done) => {
    done()
  })

  it('If user submits email existing in db, newly created user is removed', async (done) => {
    done()
  })
})
