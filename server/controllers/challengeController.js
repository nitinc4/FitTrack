import Challenge from '../models/Challenge.js';
import { ApiError } from '../middleware/errorHandler.js';

export const createChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.create(req.body);
    res.status(201).json({ success: true, data: challenge });
  } catch (error) {
    next(error);
  }
};

export const getChallenges = async (req, res, next) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: challenges });
  } catch (error) {
    next(error);
  }
};

export const joinChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const { googleId, name } = req.body;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      throw new ApiError(404, 'Challenge not found');
    }

    const participantIndex = challenge.participants.findIndex(p => p.googleId === googleId);
    if (participantIndex === -1) {
      challenge.participants.push({ googleId, name });
    } else {
      challenge.participants.splice(participantIndex, 1);
    }

    await challenge.save();
    res.status(200).json({ success: true, data: challenge });
  } catch (error) {
    next(error);
  }
};