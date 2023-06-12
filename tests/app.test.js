const request = require('supertest');
const app = require('../src/app');

describe('App', () => {
  test('should return a 404 status for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');

    expect(response.status).toBe(404);
  });

});
