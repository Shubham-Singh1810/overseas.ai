import axios from 'axios';

// Define your API base URL
const BASE_URL = 'https://overseas.ai/api/';

// Function to get state list
export const getHraList = async (access_token) => {
  try {
    const response = await axios.get(BASE_URL + 'get-all-companies/');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// Function to get job by hra
export const getJobByHra = async (params) => {
    try {
      const response = await axios.get(BASE_URL + 'jobs-posted-by-hra/' + params.cmpID, {
        headers: {
          Authorization: `Bearer ${params.access_token}`
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

export const getFollowerCount = async (params) => {
    console.log(params.access_token)
    try {
      const response = await axios.get(BASE_URL + 'follower-count/' + params.cmpId, {
        headers: {
          Authorization: `Bearer ${params.access_token}`
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
export const handleFollow = async (params) => {
    console.log(params.access_token)
    try {
      const response = await axios.post(BASE_URL + 'follow-unfollow-hra/' + params.cmpId, {}, {
        headers: {
          Authorization: `Bearer ${params.access_token}`
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

