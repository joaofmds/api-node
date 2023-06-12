// tests/rabbitmq/amqp.test.js
const amqplib = require('amqplib');
const amqp = require('../../src/rabbitmq/amqp');
const config = require('../../src/config/config');

describe('RabbitMQ Connection and Messaging', () => {
  let mockConnection;
  let mockChannel;

  beforeAll(async () => {
    mockConnection = {
      createChannel: jest.fn().mockResolvedValue(mockChannel),
    };
    mockChannel = {
      assertQueue: jest.fn().mockResolvedValue(),
      sendToQueue: jest.fn().mockResolvedValue(),
    };

    amqplib.connect = jest.fn().mockResolvedValue(mockConnection);

    await amqp();
  });

  test('should connect to the RabbitMQ', () => {
    expect(amqplib.connect).toHaveBeenCalledWith(`amqp://${config.rabbitmq.host}:${config.rabbitmq.port}`);
  });

  test('should assert the queue and send a message', () => {
    expect(mockChannel.assertQueue).toHaveBeenCalledWith('taskUpdates', { durable: true });
    expect(mockChannel.sendToQueue).toHaveBeenCalledWith('taskUpdates', expect.any(Buffer));
  });

});
