const mongoose = require('mongoose');
const config = require('../../src/config/config');
const connectToMongoDB = require('../../src/mongo/mongoose');

describe('MongoDB Connection', () => {
  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should connect to the MongoDB', () => {
    expect(mongoose.connection.readyState).toBe(1); 
  });

});
