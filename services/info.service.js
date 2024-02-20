import axios from 'axios';

// Define your API base URL
const BASE_URL = 'https://overseas.ai/api/';

// Function to get state list
export const getState = async formData => {
  try {
    const response = await axios.get(BASE_URL + 'state-list');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to get district list
export const getDistrict = async data => {
  console.log(data)
  try {
    const response = await axios.get(BASE_URL + 'district-list', {
      params: {state_id:data},
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to get job occupation list
export const getOccupations = async data => {
  try {
    const response = await axios.get(BASE_URL + 'get-occupations');
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to get  occupation wise skill
export const getSkillsByOccuId = async (occuId) => {
  try {
    const response = await axios.get(BASE_URL + 'get-occupations/'+ occuId);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to get job occupation list
export const getCountries = async data => {
  try {
    const response = await axios.get(BASE_URL + 'country-list');
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const getCountriesForJobs = async data => {
  try {
    const response = await axios.get(BASE_URL + 'country-list-for-jobs');
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
// Function to get video list/contries/occupation(job title)/skills/topprofile
export const getHomeData = async data => {
  try {
    const response = await axios.get(BASE_URL + 'home-page-data');
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};