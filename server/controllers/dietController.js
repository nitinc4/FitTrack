import DietEntry from '../models/DietEntry.js';
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

export const createDietEntry = async (req, res) => {
  try {
    const entry = await DietEntry.create(req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getDailyEntries = async (req, res) => {
  try {
    const { userId } = req.params;
    const entries = await DietEntry.find({
      userId,
      date: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date())
      }
    });
    
    const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
    
    res.status(200).json({ 
      success: true, 
      data: { entries, totalCalories } 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getWeeklyEntries = async (req, res) => {
  try {
    const { userId } = req.params;
    const entries = await DietEntry.find({
      userId,
      date: {
        $gte: startOfWeek(new Date()),
        $lte: endOfWeek(new Date())
      }
    });
    
    const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
    
    res.status(200).json({ 
      success: true, 
      data: { entries, totalCalories } 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteDietEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const deletedEntry = await DietEntry.findByIdAndDelete(entryId);
    
    if (!deletedEntry) {
      return res.status(404).json({ success: false, error: 'Entry not found' });
    }
    
    res.status(200).json({ success: true, data: deletedEntry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};