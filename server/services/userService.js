import User from '../models/User.js';

export const createOrUpdateUser = async (userData) => {
  try {
    const user = await User.findOneAndUpdate(
      { googleId: userData.googleId },
      userData,
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
};

export const getUserByGoogleId = async (googleId) => {
  try {
    return await User.findOne({ googleId });
  } catch (error) {
    console.error('Error in getUserByGoogleId:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const user = await User.findOneAndUpdate(
      { googleId: userData.googleId },
      userData,
      { new: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw error;
  }
};