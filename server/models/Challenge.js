import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  reward: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  creator: {
    googleId: { type: String, required: true },
    name: { type: String, required: true }
  },
  participants: [{
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Challenge', challengeSchema);