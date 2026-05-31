import { Router } from 'express';
const router = Router();

import { verifyjwt } from '../middlewares/auth.middleware.js';
import { validateWorkspaceAccess } from '../middlewares/workspace.middleware.js';
import { createTask, getProjectTasks, getTaskById, updateTask, deleteTask, changeTaskStatus, assignTask} from '../controllers/task.controller.js';
import { validateTaskAccess } from '../middlewares/task.middleware.js';

// Get a specific project by ID
router.get('/:projectId/:taskId', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), getTaskById);

// Update a project by ID
router.patch('/:projectId/:taskId', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), updateTask);

// Delete a project by ID
router.delete('/:projectId/:taskId', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), deleteTask);


// Change task status
router.patch('/:projectId/:taskId/status', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), changeTaskStatus);

// Assign task to user
router.patch('/:projectId/:taskId/assign', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), assignTask);

export default router;