import axios from 'axios';

// Define your API base URL
const BASE_URL = 'https://overseas.ai/api/';

// Function to get state list
export const getHraList = async (access_token) => {
  try {
    const response = await axios.get(BASE_URL + 'get-all-companies');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// Function to get state list
export const getJobByHra = async (access_token) => {
    try {
      const response = await axios.get(BASE_URL + 'get-all-companies');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

