import weatherServices from "../services/weatherServices";
import { useState, useEffect } from "react";

const DetailCountry = ({ country, length }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const fetchWeather = async () => {
      if (length === 1) {
        try {
          const lat = country.latlng[0];
          const lon = country.latlng[1];

          console.log("Latitude:", lat, "Longitude:", lon);
          const weatherData = await weatherServices.getWeatherByCity({
            lat,
            lon,
          });

          console.log({ weatherData });

          setWeather(weatherData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };
    fetchWeather();
  }, []);

  return (
    <div>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

      {weather && (
        <div>
          <h3>Weather</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default DetailCountry;
