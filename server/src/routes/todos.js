const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos - Get all TODOs
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos', message: error.message });
  }
});

// POST /api/todos - Create a new TODO
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = new Todo({
      title: title.trim(),
      description: description?.trim() || ''
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', message: error.message });
    }
    res.status(500).json({ error: 'Failed to create todo', message: error.message });
  }
});

// PUT /api/todos/:id - Update a TODO (title/description)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description?.trim() || ''
      },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', message: error.message });
    }
    res.status(500).json({ error: 'Failed to update todo', message: error.message });
  }
});

// PATCH /api/todos/:id/done - Toggle done status
router.patch('/:id/done', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.done = !todo.done;
    // Sync status with done
    todo.status = todo.done ? 'done' : 'todo';
    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    res.status(500).json({ error: 'Failed to toggle todo status', message: error.message });
  }
});

// PATCH /api/todos/:id/status - Update status (for Kanban)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['todo', 'inprogress', 'done'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be: todo, inprogress, or done' });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.status = status;
    // Sync done with status
    todo.done = status === 'done';
    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    res.status(500).json({ error: 'Failed to update status', message: error.message });
  }
});

// DELETE /api/todos/:id - Delete a TODO
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully', todo });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    res.status(500).json({ error: 'Failed to delete todo', message: error.message });
  }
});

module.exports = router;
