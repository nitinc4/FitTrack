import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: {
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    picture: String
  },
  content: { type: String, required: true },
  mediaUrl: String,
  mediaType: { type: String, enum: ['image', 'video'] },
  likes: [{ type: String }], // Array of googleIds who liked the post
  comments: [{
    author: {
      googleId: { type: String, required: true },
      name: { type: String, required: true }
    },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);