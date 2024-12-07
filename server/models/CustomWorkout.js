import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: String, required: true },
  reps: { type: String, required: true }
});

const customWorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [exerciseSchema],
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CustomWorkout', customWorkoutSchema);