import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const toggleLike = async (postId, googleId) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`, { googleId });
    return response.data.data;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

export const addComment = async (postId, comment) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/comments`, comment);
    return response.data.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};