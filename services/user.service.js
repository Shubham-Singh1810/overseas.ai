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
  try {
    const response = await axios.post(BASE_URL+"user-profile-complete-step3", formData ,{
      headers: {
        'Content-Type': `multipart/form-data`,
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
  try {
    const response = await axios.post(BASE_URL+"add-experience-step2", formData,{
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
export const editExperienceStepApi = async (formData, access_token) => {
  console.warn(formData)
  try {
    const response = await axios.post(BASE_URL+"edit-experience", formData,{
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    console.log("GRGER",response?.data)
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const getAllExperience = async (access_token) => {
  try {
    const response = await axios.get(BASE_URL+"experience-list", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const uploadWorkVideo = async (formData, access_token) => {
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

export const submitContactQuery = async (params) => {
  console.log(params.formData)
  try {
    const response = await axios.post(BASE_URL+"need-help" , params?.formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${params?.access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const editProfile = async (formData, access_token) => {
  try {
    const response = await axios.post(BASE_URL+"user-complete-profile-edit" , formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getProfileStrength = async (access_token) => {
  console.log(access_token)
  try {
    const response = await axios.get(BASE_URL+"user-improve-profile", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getNotification = async (access_token) => {
  try {
    const response = await axios.get(BASE_URL+"user-all-notification", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
// function to add passport
export const addPassportApi = async (formData, access_token) => {
  try {
    const response = await axios.post(BASE_URL+"upload-passport",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const addCvApi = async (formData, access_token) => {
  try {
    const response = await axios.post(BASE_URL+"upload-cv-by-user",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const addCovidCertificateApi = async (formData, access_token) => {
  try {
    const response = await axios.post(BASE_URL+"upload-covid-by-user",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const editPassportApi = async (formData, access_token) => {
  try {
    const response = await axios.post(BASE_URL+"passport-edit",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getPassportDetails = async (access_token) => {
  try {
    const response = await axios.get(BASE_URL+"view-passport", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const addDrivingLiecence = async (formData, access_token) => {
  console.log(formData)
  try {
    const response = await axios.post(BASE_URL+"upload-dl-by-user",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const addHighestEduCertificate = async (formData, access_token) => {
  console.log(formData)
  try {
    const response = await axios.post(BASE_URL+"upload-edu-certificate-by-user",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const addOtherDoc = async (formData, access_token) => {
  console.log(formData)
  try {
    const response = await axios.post(BASE_URL+"upload-other-docs-by-user",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const submitLoanForm = async (formData, access_token) => {
  console.log(formData,access_token)
  try {
    const response = await axios.post(BASE_URL+"need-migration-loan",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getAllDocApi = async (access_token) => {
  
  try {
    const response = await axios.get(BASE_URL+"get-all-docs-by-user", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const editDrivingLiecence = async (formData, access_token) => {
  console.log(formData)
  try {
    const response = await axios.post(BASE_URL+"edit-dl-by-user",formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const loginOut = async (access_token) => {
  try {
    const response = await axios.post(BASE_URL+"logout-app" , {}, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return (response);
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error('Error fetching data:', error);
    throw error;
  }
};