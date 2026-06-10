import { Router } from 'express';
const router = Router();

import { verifyjwt } from '../middlewares/auth.middleware.js';
import { validateWorkspaceAccess } from '../middlewares/workspace.middleware.js';
import { createTask, getProjectTasks, getTaskById, updateTask, deleteTask, changeTaskStatus, assignTask , uploadAttachment, getAttachments, deleteAttachment, getDoneTasks } from '../controllers/task.controller.js';
import { validateTaskAccess } from '../middlewares/task.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

  // ----- Filter tasks by status ----- //
  router.get('/:projectId/tasks', verifyjwt, getDoneTasks);

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

// ----- Upload attachment for a task ---- //

router.post('/:projectId/:taskId/attachments', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), upload.fields([{ name: 'attachment', maxCount: 1 }]), uploadAttachment);

router.get('/:projectId/:taskId/attachments', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), getAttachments);

router.delete('/:projectId/:taskId/attachments/:attachmentId', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), deleteAttachment);

export default router;
