import axios from 'axios';

const API_URL = 'http://localhost:3000/api/diet';

export const createDietEntry = async (entry) => {
  try {
    const response = await axios.post(`${API_URL}/entries`, entry);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create diet entry');
  }
};

export const getDailyEntries = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/entries/${userId}/daily`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch daily entries');
  }
};

export const deleteDietEntry = async (entryId) => {
  try {
    const response = await axios.delete(`${API_URL}/entries/${entryId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete entry');
  }
};