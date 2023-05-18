const request = require('supertest');

const MongoDB = require('../providers/config-mongo');
const Server = require('../schemas/server');

const app = new Server().getServer();

var container = {};
container.instance = new MongoDB();

beforeAll(async () => {
    await container.instance.open();
});

afterAll(async () => {
    await container.instance.close();
    delete container.instance;
});

describe("Test endpoint /",  () => {

  it('/', async () => {
    const response = await request(app).get('/').send();
    expect(response.statusCode).toBe(200);
  });
  it('/test', async () => {
    const response = await request(app).get('/test').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('pass!');
  });

});

describe("Test endpoint users",  () => {

  var user = null;

  it ('validation user', async () => {

    const response = await request(app).post('/api/users').send();

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].msg).toBe('Name is required');
    expect(response.body.errors[1].msg).toBe('Last Name is required');
    expect(response.body.errors[2].msg).toBe('Email is required');
    expect(response.body.errors[3].msg).toBe('Cell Phone is required');
    
  });

  it('post user', async () => {

    const data = {
      "name":"2222",
      "lastname":"lastn322am1d2d2e2w222232e2Jeds3t3",
      "email":"jest@j222ei222e32da22wd2l34",
      "cellphone": "554000001"
    }

    const response = await request(app).post('/api/users').send(data);

    expect(response.statusCode).toBe(200);
    user = response.body.users[0];
    expect(response.body.count).toBe(1);
    expect(user.uid).toBeDefined();

  });

  it('put user', async ()=>{

    const data = {
      "name":"userPut",
      "lastname":"lastnamePut"
    }
    const response = await request(app).put(`/api/users/${user.uid}`).send(data);

    user = response.body.users[0];
    expect(response.statusCode).toBe(200);
    expect(response.body.count).toBe(1);
    expect(user.name).toBe('userPut');
    expect(user.lastname).toBe('lastnamePut');

  });

  it('get id user', async ()=>{

    const response = await request(app).get(`/api/users/${user.uid}`).send();
    getUser = response.body.users[0];
    expect(response.statusCode).toBe(200);
    expect(getUser).toEqual(user);

  });

  it('delete id user', async ()=>{

    const response = await request(app).delete(`/api/users/${user.uid}`).send();
    expect(response.statusCode).toBe(200);

  });

});

