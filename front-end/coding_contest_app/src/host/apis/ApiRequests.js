import axios from 'axios';
import {handleApiResponse, handleNetworkError} from './Exceptions';

//api to send data to backend
export const sendData = async (url, data = null, headers = {}) => {
  // let response;  // Declare response variable outside the try block
  try {
    const response = await axios.post (url, data, {headers});
    return response;
  } catch (error) {
    if (error.response) {
      handleApiResponse (error.response);
    } else {
      handleNetworkError (error);
    }
  }
};

// api to get data from backend
export const getData = async (url, headers = {}) => {
  try {
    const response = await axios.get (url, {headers});
    return response;
  } catch (error) {
    if (error.response) {
      handleApiResponse (error.response);
    } else {
      handleNetworkError (error);
    }
  }
};

// API to update data on the backend (PUT request)
export const putData = async (url, data = null, headers = {}) => {
  try {
    const response = await axios.put (url, data, headers);
    return response;
  } catch (error) {
    if (error.response) {
      handleApiResponse (error.response);
    } else {
      handleNetworkError (error);
    }
  }
};

// api to delete data from backend
export const deleteData = async (url, data = null, headers = {}) => {
  try {
    if (data) {
      config.data = data; // Attach data to the config object if present
    }
    const response = await axios.delete (url, headers); // Pass config in the delete call
    return response;
  } catch (error) {
    if (error.response) {
      handleApiResponse (error.response); // Handle API response errors
    } else {
      handleNetworkError (error); // Handle network errors
    }
  }
};
