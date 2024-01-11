import axios from 'axios';

// Define your API base URL
const BASE_URL = 'https://overseas.ai/api/';

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

// Function to get job by department list
export const getJobByDepartment = async id => {
  try {
    const response = await axios.get(BASE_URL + 'occupation-wise-jobs/' + id);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to get job by country
export const getJobByCountry = async id => {
  try {
    const response = await axios.get(BASE_URL + 'country-wise-jobs/' + id);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to get job by country
export const getJobById = async id => {
  try {
    const response = await axios.get(BASE_URL + 'getJobs/' + id);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// get search result
export const getSearchResult = async (occId, countryId) => {
  try {
    const response = await axios.post(BASE_URL + `jobs-by-department-by-country`, {occId, countryId});
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// apply job
export const applyJobApi = async (formData, access_token) => {
  try {
    const response = await axios.post(BASE_URL + `apply-job-r`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};