const express = require('express');
const Task = require('../models/task');
const redisClient = require('../cache/redis');
const connectRabbitMQ = require('../rabbitmq/amqp');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();

    redisClient.get('tasks', async (err, reply) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (reply) {
        const cachedTasks = JSON.parse(reply);
        res.json(cachedTasks);
      } else {
        try {
          const tasks = await Task.findAll();
          redisClient.set('tasks', JSON.stringify(tasks));
          res.json(tasks);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await Task.create({ title, description });

    const taskMongo = new TaskModel({ title, description });
    await taskMongo.save();

    connectRabbitMQ();

    const queue = 'taskUpdates';
    const message = 'New task created';

    const connection = await amqp.connect(`amqp://${config.rabbitmq.host}:${config.rabbitmq.port}`);
    const channel = await connection.createChannel();
    channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));

    res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
