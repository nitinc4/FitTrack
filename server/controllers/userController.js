import { ApiError } from '../middleware/errorHandler.js';
import * as userService from '../services/userService.js';

export const createOrUpdateUser = async (req, res, next) => {
  try {
    const userData = req.body;
    
    if (!userData.googleId || !userData.email) {
      throw new ApiError(400, 'Missing required fields');
    }

    const user = await userService.createOrUpdateUser(userData);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByGoogleId = async (req, res, next) => {
  try {
    const { googleId } = req.params;
    const user = await userService.getUserByGoogleId(googleId);
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};