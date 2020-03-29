const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    afterAll(async () => {
        await connection.destroy();
    })
    it('must be able to create ONG', async () => {
       const response = await request(app)
       .post('/ongs')
       .send({
        name: "Test Ong Blah",
        email: "email@email.com",
        whatsapp: "11111111123",
        city: "super city",
        uf: "uu" 
       });
       expect(response.body).toHaveProperty('id');
       expect(response.body.id).toHaveLength(16);
    })
})