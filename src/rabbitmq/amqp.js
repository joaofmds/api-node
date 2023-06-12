const amqp = require('amqplib');
const config = require('../config/config');

const connectRabbitMQ = async () => {
  const connection = await amqp.connect(`amqp://${config.rabbitmq.host}:${config.rabbitmq.port}`);
  const channel = await connection.createChannel();
  console.log('Connected to RabbitMQ');

  const queue = 'taskUpdates';
  const message = 'Task updated';

  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message));
};

module.exports = connectRabbitMQ;
