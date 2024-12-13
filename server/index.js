import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import postRoutes from './routes/postRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

// Middleware and Config
import { errorHandler } from './middleware/errorHandler.js';
import { corsMiddleware, helmetMiddleware, cspMiddleware } from './middleware/security/index.js';
import connectDatabase from './config/database.js';
import sessionConfig from './config/security/sessionConfig.js';

const app = express()
app.use(cors(
  {
    origin:["https://fittrack-fitnesstracker.vercel.app"],
    methods:[POST,GET],
    credentials:true
  }
));

dotenv.config();

mongoose.connect('mongodb+srv://nitinc3114:Ncr3114@cluster0.nqipl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apply security middlewares
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(cspMiddleware);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize database connection
const dbConnection = await connectDatabase();

// Session configuration
const mongoStore = MongoStore.create({
  client: dbConnection.connection.getClient(),
  collectionName: 'sessions',
  ttl: 24 * 60 * 60 // 1 day
});

app.use(session(sessionConfig(mongoStore)));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', imageRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diet', dietRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
