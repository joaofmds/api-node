// tests/db/sequelize.test.js
const { Sequelize } = require('sequelize');
const sequelize = require('../../src/db/sequelize');

describe('Sequelize', () => {
  test('should create a Sequelize instance', () => {
    expect(sequelize).toBeInstanceOf(Sequelize);
  });

  test('should have correct database configurations', () => {
    const { options } = sequelize;
    const { database, username, password, host, port } = options;

    expect(database).toBe('your-database-name');
    expect(username).toBe('your-username');
    expect(password).toBe('your-password');
    expect(host).toBe('your-host');
    expect(port).toBe(5432); 
  });
});
