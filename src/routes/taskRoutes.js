import express from 'express';
import auth from '../middleware/auth.js';
import validateRequest from '../middleware/validRequest.js';
import {  createTaskSchema, editTaskSchema} from '../utils/joiSchemas.js';
import { createTask, getTasks, editTask, deleteTask, changeStatus } from '../controllers/taskController.js'


const router = express.Router();

router.post('/create-task', auth(), validateRequest(createTaskSchema), createTask)
router.get('/get-tasks', auth(), getTasks)
router.patch('/edit-task', auth(), validateRequest(editTaskSchema), editTask)
router.delete('/delete-task/:taskId', auth(), deleteTask)
router.patch('/change-status/:taskId', auth(), changeStatus);

export default router;