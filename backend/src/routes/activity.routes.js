import { Router } from 'express';
const router = Router();

import { verifyjwt } from '../middlewares/auth.middleware.js';
import { getProjectActivities } from '../controllers/activity.controller.js';

// Get activity log for a specific project
router.get('/:projectId', verifyjwt, getProjectActivities);

export default router;