const request = require('supertest');
const app = require('../../src/app');
const Task = require('../../src/models/task');
const redisClient = require('../../src/cache/redis');
const connectRabbitMQ = require('../../src/rabbitmq/amqp');

jest.mock('../../src/models/task');
jest.mock('../../src/cache/redis');
jest.mock('../../src/rabbitmq/amqp');

describe('Task Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET / should return tasks', async () => {
    const mockTasks = [{ id: 1, title: 'Task 1', description: 'Description 1' }];
    Task.findAll.mockResolvedValue(mockTasks);

    
    const mockCachedTasks = JSON.stringify(mockTasks);
    redisClient.get.mockImplementation((key, callback) => callback(null, mockCachedTasks));

    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockTasks);

    expect(Task.findAll).toHaveBeenCalledTimes(1);

    expect(redisClient.get).toHaveBeenCalledTimes(1);
    expect(redisClient.get).toHaveBeenCalledWith('tasks', expect.any(Function));
  });

  test('POST / should create a new task', async () => {
    const newTaskData = { title: 'New Task', description: 'New Task Description' };

    const mockNewTask = { id: 1, ...newTaskData };
    Task.create.mockResolvedValue(mockNewTask);

    const response = await request(app).post('/tasks').send(newTaskData);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockNewTask);

    expect(Task.create).toHaveBeenCalledTimes(1);
    expect(Task.create).toHaveBeenCalledWith(newTaskData);

    expect(connectRabbitMQ).toHaveBeenCalledTimes(1);
  });
  });
