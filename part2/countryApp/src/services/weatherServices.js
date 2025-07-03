import axios from "axios";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_key = "c230e7e079268e1c749145b0c1b17420";

const getWeatherByCity = async ({ lat, lon }) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather for city`, error);
    throw error;
  }
};

export default {
  getWeatherByCity,
};
