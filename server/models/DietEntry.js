import mongoose from 'mongoose';

const dietEntrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  mealType: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'snack']
  },
  calories: {
    type: Number,
    required: true
  },
  description: String,
  nutritionInfo: {
    protein_g: Number,
    carbohydrates_total_g: Number,
    fat_total_g: Number,
    fiber_g: Number,
    sugar_g: Number
  }
});

export default mongoose.model('DietEntry', dietEntrySchema);