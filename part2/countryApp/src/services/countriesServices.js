import axios from "axios";
const API_URL = "https://studies.cs.helsinki.fi/restcountries/";

const getAllCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/api/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country by name (${name}):`, error);
    throw error;
  }
};

export default {
  getAllCountries,
  getCountryByName,
};
