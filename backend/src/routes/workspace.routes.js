import { Router } from 'express';
const router = Router();

import {verifyjwt} from '../middlewares/auth.middleware.js';
import { validateWorkspaceAccess } from '../middlewares/workspace.middleware.js';
import { createWorkspace, getMyWorkspaces, getWorkspaceById, updateWorkspace, inviteUsers, joinWorkspace, roleAsign, deleteWorkspace } from '../controllers/workspace.controller.js';

// Create a new workspace
router.post('/create', verifyjwt, createWorkspace);

// Get all workspaces for the authenticated user
router.get('/my-workspaces', verifyjwt, getMyWorkspaces);

// Get a specific workspace by ID
router.get('/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner', 'admin', 'member']), getWorkspaceById);

// Update a workspace by ID
router.patch('/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner']), updateWorkspace);

// Invite users to workspace
router.post('/invite-users/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner', 'admin']), inviteUsers);

// Join workspace using invitation token
router.post('/join-workspace/:invitationToken', verifyjwt, joinWorkspace);

// Role assignment
router.post('/Role-Asing/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner']), roleAsign);

// Delete a workspace by ID
router.delete('/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner']), deleteWorkspace);

export default router;