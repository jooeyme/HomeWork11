const request = require('supertest');
const app = require('../app');
const { sequelize, Todo } = require('../models');

beforeAll(async () => {
  await sequelize.sync();
});

afterEach(async () => {
  await Todo.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Todo API', () => {
  it('create a new todo', async () => {
    const res = await request(app).post('/todos').send({ title: 'Test Todo' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('Test Todo');
  });

  it('get all todos', async () => {
    await Todo.create({ title: 'Test Todo 1' });
    await Todo.create({ title: 'Test Todo 2' });

    const res = await request(app).get('/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it('get a specific todo', async () => {
    const newTodo = await Todo.create({ title: 'Test Todo' });

    const res = await request(app).get(`/todos/${newTodo.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('Test Todo');
  });

  it('delete a todo', async () => {
    const newTodo = await Todo.create({ title: 'Test Todo' });

    const res = await request(app).delete(`/todos/${newTodo.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Todo deleted');
  });
});