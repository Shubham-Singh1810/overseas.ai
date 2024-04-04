import axios from 'axios';

// Define your API base URL
const BASE_URL = 'https://overseas.ai/api/';
// const BASE_URL = "https://test.overseas.ai/api/"; // test api
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
export const getCourseList = async access_token => {
  try {
    const response = await axios.get(
      BASE_URL + 'list-all-course',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


export const searchForCourse = async (params) => {
  try {
    const response = await axios.post(
      BASE_URL + 'filter-courses', {instId:params.id},
      {
        headers: {
          Authorization: `Bearer ${params?.access_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const applyCourse = async (params) => {
  try {
    const response = await axios.post(
      BASE_URL + 'apply-course/'+ params.id, {},
      {
        headers: {
          Authorization: `Bearer ${params?.access_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const getListOfAppliedCourse = async (access_token) => {
  try {
    const response = await axios.get(
      BASE_URL + 'applied-course',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};