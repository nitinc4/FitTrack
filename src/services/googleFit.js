import axios from 'axios';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';


const GOOGLE_FIT_API = 'https://www.googleapis.com/fitness/v1/users/me';

export const fetchFitnessData = async (accessToken) => {
  try {
    const now = new Date();
    const startTime = startOfDay(subDays(now, 7)).getTime();
    const endTime = endOfDay(now).getTime();

    const response = await axios.post(
      `${GOOGLE_FIT_API}/dataset:aggregate`,
      {
        aggregateBy: [
          {
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
          },
          {
            dataTypeName: 'com.google.calories.expended',
            dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended'
          },
          {
            dataTypeName: 'com.google.active_minutes',
            dataSourceId: 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes'
          }
        ],
        bucketByTime: { durationMillis: 86400000 }, // 1 day
        startTimeMillis: startTime,
        endTimeMillis: endTime
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return processAggregatedData(response.data);
  } catch (error) {
    console.error('Error fetching fitness data:', error);
    throw error;
  }
};

const processAggregatedData = (data) => {
  const processedData = {
    daily: {
      steps: 0,
      calories: 0,
      activeMinutes: 0
    },
    weekly: {
      steps: 0,
      calories: 0,
      activeMinutes: 0,
      dailySteps: []
    }
  };

  if (data.bucket && data.bucket.length > 0) {
    data.bucket.forEach((bucket, index) => {
      const date = new Date(parseInt(bucket.startTimeMillis));
      const dayData = {
        date: format(date, 'EEE'),
        steps: 0,
        calories: 0,
        activeMinutes: 0
      };

      bucket.dataset.forEach(dataset => {
        const point = dataset.point[0];
        if (!point) return;

        switch (dataset.dataSourceId) {
          case 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps':
            dayData.steps = point.value[0].intVal;
            break;
          case 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended':
            dayData.calories = Math.round(point.value[0].fpVal);
            break;
          case 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes':
            dayData.activeMinutes = point.value[0].intVal;
            break;
        }
      });

      // Add to weekly totals
      processedData.weekly.steps += dayData.steps;
      processedData.weekly.calories += dayData.calories;
      processedData.weekly.activeMinutes += dayData.activeMinutes;
      processedData.weekly.dailySteps.push(dayData);

      // If it's the most recent day, set as daily values
      if (index === data.bucket.length - 1) {
        processedData.daily = {
          steps: dayData.steps,
          calories: dayData.calories,
          activeMinutes: dayData.activeMinutes
        };
      }
    });
  }

  return processedData;
};