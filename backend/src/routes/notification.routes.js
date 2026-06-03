import { Router } from 'express';
const router = Router();

import { verifyjwt } from '../middlewares/auth.middleware.js';
import { getNotification, getNotificationById, getNotificationRead } from '../controllers/notification.controller.js';

// Get a specific notification
router.get('/', verifyjwt, getNotification);
router.patch('/read', verifyjwt, getNotificationRead);
router.get('/:notificationId', verifyjwt, getNotificationById);


export default router;