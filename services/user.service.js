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

export const signUp = async (formData) => {
  try {
    const response = await axios.get(BASE_URL+"get-otp",{
      params:formData
    } );
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const verifyOtpForSignUp = async (formData) => {
  try {
    
    const response = await axios.post(BASE_URL+"resgister-person-step1",formData);
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
// Function to make a POST request
export const registerUserStep1 = async (formData, access_token) => {
  console.log(formData)
  try {
    const response = await axios.post(BASE_URL+"user-profile-complete-step2", formData ,{
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const registerUserStep2 = async (formData, access_token) => {
  console.log(formData)
  try {
    const response = await axios.post(BASE_URL+"user-profile-complete-step3", formData ,{
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const addExperienceStep2 = async (formData, access_token) => {
  console.log("formData", formData);
  try {
    const response = await axios.post(BASE_URL+"add-experience-step2", formData,{
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    console.log(response?.data)
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const uploadWorkVideo = async (formData, access_token) => {
  console.log("formData", formData);
  try {
    const response = await axios.post(BASE_URL+"store-work-video", formData,{
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    console.log(response?.data)
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

