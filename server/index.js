import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import postRoutes from './routes/postRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import connectDatabase from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

connectDatabase();

app.use('/api/users', userRoutes);
app.use('/api', imageRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diet', dietRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/clarifai', async (req, res) => {
  try {
    const { base64 } = req.body;
    const clarifaiResponse = await axios.post(
      'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
      {
        inputs: [
          {
            data: {
              image: {
                base64,
              },
            },
          },
        ],
      },
      {
        headers: {
          'Authorization': `Key ${process.env.CLARIFAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json(clarifaiResponse.data);
  } catch (error) {
    console.error('Clarifai API error:', error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});