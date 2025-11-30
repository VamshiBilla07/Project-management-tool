import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../prisma.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const { projectId } = req.query;
    const where = projectId ? { projectId } : {};
    
    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: {
        project: true,
      },
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Create task
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Task title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['todo', 'in_progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('assignee').optional().trim(),
    body('deadline').optional().isISO8601(),
    body('projectId').notEmpty().withMessage('Project ID is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await prisma.task.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status || 'todo',
          priority: req.body.priority || 'medium',
          assignee: req.body.assignee,
          deadline: req.body.deadline ? new Date(req.body.deadline) : null,
          projectId: req.body.projectId,
        },
        include: {
          project: true,
        },
      });
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      if (error.code === 'P2003') {
        return res.status(400).json({ error: 'Invalid project ID' });
      }
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
);

// Update task
router.put(
  '/:id',
  [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim(),
    body('status').optional().isIn(['todo', 'in_progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('assignee').optional().trim(),
    body('deadline').optional().isISO8601(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updateData = { ...req.body };
      if (updateData.deadline) {
        updateData.deadline = new Date(updateData.deadline);
      }

      const task = await prisma.task.update({
        where: { id: req.params.id },
        data: updateData,
        include: {
          project: true,
        },
      });
      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(500).json({ error: 'Failed to update task' });
    }
  }
);

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
