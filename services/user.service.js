import axios from 'axios';

// Define your API base URL
const BASE_URL = "https://overseas.ai/api/";

// Function to make a GET request
export const loginUsingPassword = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"passsword-login" , formData);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const loginUsingOtp = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"otp-request" , formData);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const verifyOtpForLogin = async (formData) => {
  try {
    const response = await axios.post(BASE_URL+"otp-login" , formData);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

// export const signUp = async (formData) => {
//   try {
//     const response = await axios.post(BASE_URL+"" , formData);
//     return (response);
//   } catch (error) {
//     // Handle error (e.g., log or throw an error)
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
// Function to make a POST request
export const postApiData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};