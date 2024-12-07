import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios'; // Add axios for making API requests
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import connectDatabase from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
connectDatabase();

// Routes
app.use('/api/users', userRoutes);
app.use('/api', imageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Clarifai Proxy Route
app.post('/api/clarifai', async (req, res) => {
  try {
    const { base64 } = req.body; // Ensure the request contains the image in base64 format
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
          'Authorization': `Key ${process.env.CLARIFAI_API_KEY}`, // Use your API key from the .env file
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

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
