import { Router } from 'express';
const router = Router();

import { verifyjwt } from '../middlewares/auth.middleware.js';
import { validateWorkspaceAccess } from '../middlewares/workspace.middleware.js';
import { createProject, getMyProjects, getProjectById, updateProject, deleteProject} from '../controllers/project.controller.js';

// Create a new project
router.post('/create/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner', 'admin']), createProject);

// Get all projects for the authenticated user
router.get('/my-projects/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner', 'admin', 'member']), getMyProjects);

// Get a specific project by ID
router.get('/:workspaceId/:projectId', verifyjwt, validateWorkspaceAccess(['owner', 'admin', 'member']), getProjectById);

// Update a project by ID
router.patch('/:workspaceId/:projectId', verifyjwt, validateWorkspaceAccess(['owner', 'admin']), updateProject);

router.delete('/:workspaceId/:projectId', verifyjwt, validateWorkspaceAccess(['owner', 'admin']), deleteProject);

export default router;