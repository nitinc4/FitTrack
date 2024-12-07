import express from 'express';
import * as workoutController from '../controllers/workoutController.js';

const router = express.Router();

router.post('/', workoutController.createWorkout);
router.get('/user/:userId', workoutController.getWorkouts);
router.delete('/:id', workoutController.deleteWorkout);

export default router;