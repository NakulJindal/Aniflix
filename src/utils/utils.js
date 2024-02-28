import axios from "axios";

export const apiCall = async (URL) => {
  try {
    const response = await axios.get(URL);
    return response.data.data;
  } catch (error) {
    console.log(URL);
    console.log(error);
    return null;
  }
};
