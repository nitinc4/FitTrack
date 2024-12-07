import express from 'express';
import * as challengeController from '../controllers/challengeController.js';

const router = express.Router();

router.post('/', challengeController.createChallenge);
router.get('/', challengeController.getChallenges);
router.post('/:challengeId/join', challengeController.joinChallenge);

export default router;