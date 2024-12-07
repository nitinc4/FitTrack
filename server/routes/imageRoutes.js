import express from 'express';
import { analyzeImage } from '../controllers/imageController.js';

const router = express.Router();

router.post('/analyze-image', analyzeImage);

export default router;