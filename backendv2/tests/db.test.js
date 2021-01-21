const request = require('supertest')
const app = require('../app')
describe('User API', () => {
    it('should show all users', async () => {
        const res = await request(app).get('/answers')
        expect(res.body).toHaveProperty('answers')
    }),
{}})