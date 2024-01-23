import axios from 'axios';

// Define your API base URL
const BASE_URL = 'https://overseas.ai/api/';

// Function to get job occupation list
export const getInstituteList = async access_token => {
  try {
    const response = await axios.get(BASE_URL + 'list-training-institute', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const getCourseByInstitute = async params => {
  console.log(params);
  try {
    const response = await axios.post(
      BASE_URL + 'courses-by-institute',
      {instId: params.instId},
      {
        headers: {
          Authorization: `Bearer ${params.access_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
