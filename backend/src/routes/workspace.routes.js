import { Router } from 'express';
const router = Router();

import {verifyjwt} from '../middlewares/auth.middleware.js';
import { validateWorkspaceAccess } from '../middlewares/workspace.middleware.js';
// import { validate } from '../middlewares/validate.middleware.js';
// import { createWorkspaceSchema } from '../validations/workspace.validation.js';
import { createWorkspace, getMyWorkspaces, getWorkspaceById, updateWorkspace } from '../controllers/workspace.controller.js';

// Create a new workspace
router.post('/create', verifyjwt, createWorkspace);

// // Get all workspaces for the authenticated user
router.get('/my-workspaces', verifyjwt, getMyWorkspaces);

// // Get a specific workspace by ID
router.get('/:workspaceId', verifyjwt, getWorkspaceById);

// // Update a workspace by ID
router.patch('/:workspaceId', verifyjwt, validateWorkspaceAccess('owner'), updateWorkspace);

// router.put('/:workspaceId', verifyjwt,validateWorkspaceAccess, updateWorkspace);
// // Delete a workspace by ID
// router.delete('/:workspaceId', verifyjwt, deleteWorkspace);

export default router;