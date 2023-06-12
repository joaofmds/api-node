const redis = require('redis');
const sinon = require('sinon');
const redisClient = require('../../src/cache/redis');

describe('Redis Client', () => {
  let redisStub;

  beforeEach(() => {
    redisStub = sinon.stub(redis, 'createClient').returns({
      on: sinon.stub(),
      get: sinon.stub(),
      set: sinon.stub(),
    });
  });

  afterEach(() => {
    redisStub.restore();
  });

  it('should connect to Redis', () => {
    expect(redisClient).toBeDefined();
    expect(redisStub.calledOnce).toBe(true);
  });

  it('should set a value in Redis', () => {
    const key = 'myKey';
    const value = 'myValue';

    redisClient.set(key, value);

    expect(redisStub().set.calledOnceWith(key, value)).toBe(true);
  });

  it('should get a value from Redis', (done) => {
    const key = 'myKey';
    const value = 'myValue';

    redisClient.get(key, (err, reply) => {
      expect(err).toBeNull();
      expect(reply).toEqual(value);
      expect(redisStub().get.calledOnceWith(key)).toBe(true);
      done();
    });

    redisStub().get.yield(null, value);
  });
});
