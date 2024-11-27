import axios from 'axios';
import { startOfDay, endOfDay, subDays } from 'date-fns';
import { processAggregatedData } from '../utils/fitnessDataProcessor';

export const GOOGLE_FIT_API = 'https://www.googleapis.com/fitness/v1/users/me';

// Utility functions to calculate additional fitness metrics
const calculateHeartRateStats = (points) => {
  if (!points || points.length === 0) {
    return { current: 0, min: 0, max: 0, average: 0 };
  }

  const values = points.map((point) => point.value[0].fpVal);
  return {
    current: values[values.length - 1] || 0,
    min: Math.min(...values),
    max: Math.max(...values),
    average: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
  };
};

const calculateSleepStats = (points) => {
  if (!points || points.length === 0) {
    return {
      deepSleepMinutes: 0,
      lightSleepMinutes: 0,
      remSleepMinutes: 0,
      totalSleepMinutes: 0,
    };
  }

  let deepSleep = 0;
  let lightSleep = 0;
  let remSleep = 0;

  points.forEach((point) => {
    const sleepStage = point.value[0].intVal;
    const durationMillis = point.endTimeNanos / 1000000 - point.startTimeNanos / 1000000;
    const durationMinutes = Math.round(durationMillis / 60000);

    switch (sleepStage) {
      case 1: // Light sleep
        lightSleep += durationMinutes;
        break;
      case 2: // Deep sleep
        deepSleep += durationMinutes;
        break;
      case 3: // REM sleep
        remSleep += durationMinutes;
        break;
    }
  });

  return {
    deepSleepMinutes: deepSleep,
    lightSleepMinutes: lightSleep,
    remSleepMinutes: remSleep,
    totalSleepMinutes: deepSleep + lightSleep + remSleep,
  };
};

export const fetchUserProfile = async (accessToken) => {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

export const fetchFitnessData = async (accessToken) => {
  if (!accessToken) {
    throw new Error('Access token is required');
  }

  const now = new Date();
  const startTime = startOfDay(subDays(now, 7)).getTime();
  const endTime = endOfDay(now).getTime();

  try {
    const response = await axios.post(
      `${GOOGLE_FIT_API}/dataset:aggregate`,
      {
        aggregateBy: [
          {
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
          },
          {
            dataTypeName: 'com.google.calories.expended',
            dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended',
          },
          {
            dataTypeName: 'com.google.active_minutes',
            dataSourceId: 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes',
          },
          {
            dataTypeName: 'com.google.heart_rate.bpm',
          },
          {
            dataTypeName: 'com.google.sleep.segment',
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const processedData = processAggregatedData(response.data);
console.log(response)
    return {
      ...processedData,
      heartRate: calculateHeartRateStats(response.data.bucket[0]?.dataset[3]?.point || []),
      sleep: calculateSleepStats(response.data.bucket[0]?.dataset[4]?.point || []),
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      if (error.response?.status === 403) {
        throw new Error('Access denied. Please check your permissions.');
      }
    }
    throw new Error('Failed to fetch fitness data. Please try again later.');
  }
};
