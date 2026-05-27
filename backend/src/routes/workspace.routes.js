import { Router } from 'express';
const router = Router();

import {verifyjwt} from '../middlewares/auth.middleware.js';
import { createWorkspace } from '../controllers/workspace.controller.js';

// Create a new workspace
router.post('/create', verifyjwt, createWorkspace);

// // Get all workspaces for the authenticated user
// router.get('/list', verifyjwt, getWorkspaces);

// // Get a specific workspace by ID
// router.get('/:id', verifyjwt, getWorkspaceById);

// // Update a workspace by ID
// router.put('/:id', verifyjwt, updateWorkspace);

// // Delete a workspace by ID
// router.delete('/:id', verifyjwt, deleteWorkspace);

export default router;