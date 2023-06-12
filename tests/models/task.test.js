// tests/models/task.test.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../src/db/sequelize');
const Task = require('../../src/models/task');

describe('Task Model', () => {
  beforeAll(async () => {
    await Task.sync({ force: true });
  });

  test('should create a new task', async () => {
    const newTask = await Task.create({
      title: 'Task 1',
      description: 'Description 1',
    });

    expect(newTask).toBeInstanceOf(Task);
    expect(newTask.title).toBe('Task 1');
    expect(newTask.description).toBe('Description 1');
  });

  test('should not allow null values for title and description', async () => {
    await expect(Task.create({})).rejects.toThrow();

    await expect(
      Task.create({
        title: 'Task 2',
        description: 'Description 2',
      })
    ).resolves.toBeTruthy();
  });

});
