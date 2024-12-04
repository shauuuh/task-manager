import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { validateTask } from '../middleware/taskDataValidation.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', validateTask, createTask);
router.put('/:taskId', validateTask, updateTask);
router.delete('/:taskId', deleteTask);

export default router;

