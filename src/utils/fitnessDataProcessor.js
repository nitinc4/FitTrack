import { format } from 'date-fns';

export const processAggregatedData = (data) => {
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

  if (!data.bucket || !Array.isArray(data.bucket)) {
    return processedData;
  }

  data.bucket.forEach((bucket, index) => {
    const date = new Date(parseInt(bucket.startTimeMillis));
    const dayData = {
      date: format(date, 'EEE'),
      steps: 0,
      calories: 0,
      activeMinutes: 0
    };

    bucket.dataset.forEach((dataset) => {
      const point = dataset.point?.[0];
      if (!point) return;

      switch (dataset.dataSourceId) {
        case 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps':
          dayData.steps = point.value[0].intVal || 0;
          break;
        case 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended':
          dayData.calories = Math.round(point.value[0].fpVal || 0);
          break;
        case 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes':
          dayData.activeMinutes = point.value[0].intVal || 0;
          break;
      }
    });

    processedData.weekly.steps += dayData.steps;
    processedData.weekly.calories += dayData.calories;
    processedData.weekly.activeMinutes += dayData.activeMinutes;
    processedData.weekly.dailySteps.push(dayData);

    if (index === data.bucket.length - 1) {
      processedData.daily = {
        steps: dayData.steps,
        calories: dayData.calories,
        activeMinutes: dayData.activeMinutes
      };
    }
  });

  return processedData;
};