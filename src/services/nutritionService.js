import axios from 'axios';

const CALORIE_NINJA_API_KEY = "9AWK9Jt/hdW4RBKFSPPApQ==zDIOA8e7Ci1fw8hJ";

export const fetchNutritionInfo = async (foodName) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodName)}`,
      headers: {
        'X-Api-Key': CALORIE_NINJA_API_KEY
      }
    });

    const defaultNutrition = {
      name: foodName,
      calories: 0,
      protein_g: 0,
      fat_total_g: 0,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      serving_size_g: 100,
      sodium_mg: 0,
      potassium_mg: 0,
      cholesterol_mg: 0
    };

    if (!response.data?.items?.[0]) {
      return defaultNutrition;
    }

    return {
      ...defaultNutrition,
      ...response.data.items[0]
    };
  } catch (error) {
    console.error('Nutrition API error:', error);
    throw new Error('Failed to fetch nutrition information');
  }
};