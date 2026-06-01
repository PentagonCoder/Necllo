import { Router } from 'express';
const router = Router();

import { verifyjwt } from '../middlewares/auth.middleware.js';
import { validateTaskAccess } from '../middlewares/task.middleware.js';
import { createComment, getTaskComments, updateComment, deleteComment } from '../controllers/comment.controller.js';
import { validateCommentAccess } from '../middlewares/comment.middleware.js';
// ---- Comment routes ---- //

// Create a new comment
router.post('/:projectId/:taskId', verifyjwt, validateTaskAccess(['owner', 'admin', 'member']), createComment);

// Get all comments for a specific task
router.get('/:projectId/:taskId', verifyjwt,  validateTaskAccess(['owner', 'admin', 'member']), getTaskComments);

// Update a comment by ID
router.patch('/:taskId/:commentId', verifyjwt, validateCommentAccess(), updateComment);

// Delete a comment by ID
router.delete('/:taskId/:commentId', verifyjwt, validateCommentAccess(), deleteComment);


export default router;