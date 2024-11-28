import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Remove the /users prefix since it's already included in the main app routing
router.post('/', userController.createOrUpdateUser);
router.get('/:googleId', userController.getUserByGoogleId);

export default router;