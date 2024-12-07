import CustomWorkout from '../models/CustomWorkout.js';
import { ApiError } from '../middleware/errorHandler.js';

export const createWorkout = async (req, res, next) => {
  try {
    const workout = await CustomWorkout.create(req.body);
    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    next(error);
  }
};

export const getWorkouts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const workouts = await CustomWorkout.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workout = await CustomWorkout.findByIdAndDelete(id);
    if (!workout) {
      throw new ApiError(404, 'Workout not found');
    }
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    next(error);
  }
};