import express from 'express';
import { createTask, getAllTasks, updateProgress, updateTask, deleteTask } from '../controllers/taskController.js';
import { validateTask } from '../middleware/taskDataValidation.js';

const router = express.Router();

/* ---- RUTAS ---- */
router.get('/', getAllTasks);
router.post('/', validateTask, createTask);
router.patch('/:taskId', updateProgress);
router.put('/:taskId', validateTask, updateTask);
router.delete('/:taskId', deleteTask);

export default router;


