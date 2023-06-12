const request = require('supertest');
const app = require('../src/app');
const server = require('../src/server');

describe('Server', () => {
  let httpServer;

  beforeAll(() => {
    httpServer = server.listen(3000);
  });

  afterAll((done) => {
    httpServer.close(done);
  });

  test('should respond with 200 status for / endpoint', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });

});
