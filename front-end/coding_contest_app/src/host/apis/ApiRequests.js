import axios from "axios";

//api to send data to backend
export const sendData = async (url, data = null, headers={}) => {
  try {
    const response = await axios.post(url, data, headers);
    return response;
  } catch (error) {
    console.error("Error making POST API request:", error.response || error.message);
    throw error;
  }
};

// api to get data from backend
export const getData = async (url, headers={}) => {
    try {
      const response = await axios.get(url, headers);
      return response;
    } catch (error) {
      console.error("Error making GET API request:", error.response || error.message);
      throw error;
    }
  };

