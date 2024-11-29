import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.createOrUpdateUser);
router.get('/:googleId', userController.getUserByGoogleId);
router.post('/onboarding', userController.updateUserProfile);

export default router;