import express from 'express';
import * as dietController from '../controllers/dietController.js';

const router = express.Router();

router.post('/entries', dietController.createDietEntry);
router.get('/entries/:userId/daily', dietController.getDailyEntries);
router.get('/entries/:userId/weekly', dietController.getWeeklyEntries);
router.delete('/entries/:entryId', dietController.deleteDietEntry);

export default router;