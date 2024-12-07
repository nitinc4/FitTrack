import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  author: {
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    picture: String
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);