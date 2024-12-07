import axios from 'axios';

const API_KEY = "9AWK9Jt/hdW4RBKFSPPApQ==zDIOA8e7Ci1fw8hJ";

export const fetchNutritionInfo = async (query) => {
  try {
    const response = await axios.get(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "X-Api-Key": API_KEY
        }
      }
    );
    return response.data.items;
  } catch (error) {
    console.error('Error fetching nutrition info:', error);
    throw error;
  }
};