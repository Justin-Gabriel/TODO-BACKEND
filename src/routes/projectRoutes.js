import express from 'express';
import auth from '../middleware/auth.js';
import validateRequest from '../middleware/validRequest.js';
import { projectSchema, editProjectSchema } from '../utils/joiSchemas.js';
import { createProject, getProjects, editProject, deleteProject, projectDetails, exportProject } from '../controllers/projectController.js'


const router = express.Router();

router.post('/create-project', auth(), validateRequest(projectSchema), createProject);
router.get('/get-projects', auth(), getProjects);
router.patch('/edit-project', auth(),validateRequest(editProjectSchema), editProject);
router.delete('/delete-project/:projectId', auth(), deleteProject);
router.get('/summary/:projectId', auth(), exportProject)
router.get('/:projectId?', auth(), projectDetails);


export default router;