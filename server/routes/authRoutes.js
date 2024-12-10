import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register/:googleId/challenge', authController.generateRegistrationChallenge);
router.post('/register/:googleId/verify', authController.verifyRegistration);
router.post('/authenticate/:googleId/challenge', authController.generateAuthenticationChallenge);
router.post('/authenticate/:googleId/verify', authController.verifyAuthentication);

export default router;