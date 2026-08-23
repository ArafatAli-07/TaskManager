import express from 'express';
import { deleteTask, editTask, getTask, uploadtask } from '../controllers/task.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/upload').post(isAuthenticated, uploadtask);
router.route('/all-tasks').get(isAuthenticated, getTask);
router.route('/:taskId/edit-task').put(isAuthenticated, editTask);
router.route('/:taskId/delete-task').get(isAuthenticated, deleteTask);

export default router