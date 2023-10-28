const express = require('express');
const { Todo } = require('../models');

const router = express.Router();

// List all todo
router.get('/', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

// Detail todo
router.get('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  res.json(todo);
});

// Create todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  const newTodo = await Todo.create({ title });
  res.json(newTodo);
});

// Delete todo with soft delete
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  await todo.destroy();
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
