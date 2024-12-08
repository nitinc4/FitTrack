import Post from '../models/Post.js';
import { ApiError } from '../middleware/errorHandler.js';

export const createPost = async (req, res, next) => {
  try {
    const { content, mediaUrl, mediaType, author } = req.body;
    const post = await Post.create({
      content,
      mediaUrl,
      mediaType,
      author
    });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { googleId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError(404, 'Post not found');
    }

    const likeIndex = post.likes.indexOf(googleId);
    if (likeIndex === -1) {
      post.likes.push(googleId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { author, content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError(404, 'Post not found');
    }

    const newComment = {
      author,
      content,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    // Fetch the updated post with populated comments
    const updatedPost = await Post.findById(postId);
    res.status(201).json({ success: true, data: updatedPost });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    
    if (!post) {
      throw new ApiError(404, 'Post not found');
    }

    res.status(200).json({ success: true, data: post.comments });
  } catch (error) {
    next(error);
  }
};