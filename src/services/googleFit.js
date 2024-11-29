import { subDays, startOfDay, endOfDay, format } from 'date-fns';

const aggregateDataByDate = (bucket) => {
  const datasets = bucket.dataset;
  
  return {
    steps: datasets[0]?.point?.[0]?.value?.[0]?.intVal || 0,
    calories: Math.round(datasets[1]?.point?.[0]?.value?.[0]?.fpVal || 0),
    activeMinutes: datasets[2]?.point?.[0]?.value?.[0]?.intVal || 0,
    heartRate: datasets[3]?.point?.[0]?.value?.[0]?.fpVal || 0
  };
};

export const fetchFitnessData = async (accessToken) => {
  try {
    const now = new Date();
    const sevenDaysAgo = subDays(now, 7);
    
    const response = await fetch(
      'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aggregateBy: [
            { dataTypeName: 'com.google.step_count.delta' },
            { dataTypeName: 'com.google.calories.expended' },
            { dataTypeName: 'com.google.active_minutes' },
            { dataTypeName: 'com.google.heart_rate.bpm' }
          ],
          bucketByTime: { durationMillis: 86400000 }, // 1 day in milliseconds
          startTimeMillis: startOfDay(sevenDaysAgo).getTime(),
          endTimeMillis: endOfDay(now).getTime(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch fitness data');
    }

    const data = await response.json();
    
    // Process daily data
    const dailyData = data.bucket.map(bucket => ({
      date: format(new Date(parseInt(bucket.startTimeMillis)), 'EEE'),
      ...aggregateDataByDate(bucket)
    }));

    // Calculate weekly totals
    const weeklyTotals = dailyData.reduce((acc, day) => ({
      steps: acc.steps + day.steps,
      calories: acc.calories + day.calories,
      activeMinutes: acc.activeMinutes + day.activeMinutes
    }), { steps: 0, calories: 0, activeMinutes: 0 });

    return {
      daily: dailyData[dailyData.length - 1], // Today's data
      weekly: {
        ...weeklyTotals,
        dailySteps: dailyData,
        activeDays: dailyData.filter(day => day.steps > 0).length
      }
    };
  } catch (error) {
    console.error('Error fetching fitness data:', error);
    throw error;
  }
};