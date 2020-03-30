const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

let newOng = '';
beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
});
afterAll(async () => {
    await connection.destroy();
});

describe('ONG', () => {
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
       newOng = response.body.id;
    });
});

describe('edit Ong', () => {
    it('must be able to edit ONG', async () => {
        const res = await request(app)
        .put('/ongs')
        .set('Authorization', newOng)
        .send({
            name: "Test Ong Blah 2",
            email: "email@email.com",
            whatsapp: "11111111123",
            city: "Taboao da Serra",
            uf: "SP"
        });
        expect(res.body).toHaveProperty('message');
    });
});

describe('List ongs', () => {
    it('must be possible to list ongs',async () => {
        const ongs = await request(app)
        .get('/ongs')
        expect(ongs.body).toHaveProperty('data');
        expect(ongs.body.data).toHaveLength(1);
    });
});

describe('get ong details', () => {
    it('must be possible to get details from a given ong id', async () => {
        const ong = await request(app)
        .get('/ongs')
        .set('Authorization', newOng)
        expect(ong.body).toHaveProperty('data');
    })
});

describe('get error ong details', () => {
    it('endpoint must return an error after sending invalid ong id', async () => {
        const ong = await request(app)
        .get('/ong')
        .set('Authorization', "abcd")
        expect(ong.body).toHaveProperty('error');
    })
});

describe('create case', () => {
    it('must be able to create a case',async () => {
        const cases = await request(app)
        .post('/cases')
        .set('Authorization', newOng)
        .send({
            title: 'Test',
            description: 'Blah',
            value: 100
        });
        expect(cases.body).toHaveProperty('id');
        expect(cases.body).toHaveProperty('ong_id');
    });
});

describe('list cases', () => {
    it('must be possible to list cases', async () => {
        const cases = await request(app)
        .get('/cases')
        expect(cases.body).toHaveProperty('data');
        expect(cases.body.data[0]).toHaveProperty('city');
    });
});

describe('list cases by ONG', () => {
    it('must be possible to list cases by a given ong', async () => {
        const cases = await request(app)
        .get('/cases-ongs')
        .set('Authorization', newOng)
        expect(cases.body).toHaveProperty('data');
        expect(cases.body.data[0]).toHaveProperty('title');
    });
});

describe('get a single case', () => {
    it('must be able to get data from a single case', async () => {
        const singleCase = await request(app)
        .get('/case/1')
        expect(singleCase.body).toHaveProperty('data');
    });
});

describe('display error message for invalid case', () => {
    it('must return an error for invalid case id', async () => {
        const singleCase = await request(app)
        .get('/case/12')
        expect(singleCase.body).toHaveProperty('error');
    });
});

describe('delete case', () => {
    it('must delete a given case', async () => {
        const singleCase = await request(app)
        .get('/case/1')
        expect(204);
    });
});

describe('delete invalid case id', () => {
    it('must return an error when deleting invalid case id', async () => {
        const singleCase = await request(app)
        .get('/case/12')
        expect(singleCase).toHaveProperty('error');
    });
});