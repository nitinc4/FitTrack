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
    const durationMillis =
      point.endTimeNanos / 1000000 - point.startTimeNanos / 1000000;
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
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

export const fetchFitnessData = async (accessToken) => {
  const now = new Date();
  const startTime = new Date(now.setHours(0, 0, 0, 0)).getTime();
  const endTime = new Date().getTime();
  const yesterdayStartTime = startTime - 24 * 60 * 60 * 1000;

  const response = await fetch(
    `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
          },
          {
            dataTypeName: "com.google.calories.expended",
          },
          {
            dataTypeName: "com.google.active_minutes",
          },
          {
            dataTypeName: "com.google.heart_rate.bpm",
          },
          {
            dataTypeName: "com.google.sleep.segment",
          },
        ],
        startTimeMillis: yesterdayStartTime,
        endTimeMillis: endTime,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch fitness data");
  }

  const data = await response.json();

  return {
    steps: data?.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0,
    calories: Math.round(data?.bucket?.[0]?.dataset?.[1]?.point?.[0]?.value?.[0]?.fpVal || 0),
    activeMinutes: data?.bucket?.[0]?.dataset?.[2]?.point?.[0]?.value?.[0]?.intVal || 0,
    heartRate: calculateHeartRateStats(data?.bucket?.[0]?.dataset?.[3]?.point || []),
    sleep: calculateSleepStats(data?.bucket?.[0]?.dataset?.[4]?.point || []),
    lastUpdated: new Date().toISOString(),
  };
};
