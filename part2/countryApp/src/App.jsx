import { useState, useEffect } from "react";
import "./App.css";
import countriesServices from "./services/countriesServices";
import DetailCountry from "./components/DetailCountry";
import ShowCountries from "./components/ShowCountries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [message, setMessage] = useState("Type a country name to search");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countriesServices.getAllCountries();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleChangeFilterBox = async (event) => {
    const value = event.target.value;

    setFilterText(value);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );

    if (value === "") {
      setFilteredCountries(countries);
      setMessage("Type a country name to search");
      return;
    }

    if (value !== "") setMessage("");

    setFilteredCountries(filtered);

    if (filtered.length === 0) {
      setMessage("No countries found");
      return;
    }

    if (filtered.length > 10) {
      setFilteredCountries([]);
      setMessage("Too many matches, specify another filter");
      return;
    }

    if (filtered.length === 1) {
      const country = await countriesServices.getCountryByName(
        filteredCountries[0].name.common
      );
      console.log(country);
      setFilteredCountries(country);
      return;
    }
  };

  return (
    <>
      <div>find country</div>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={handleChangeFilterBox}
        value={filterText}
      />
      <ShowCountries
        filteredCountries={filteredCountries}
        countriesServices={countriesServices}
        setFilterText={setFilterText}
        setFilteredCountries={setFilteredCountries}
      />
      {filteredCountries.length === 1 && (
        <DetailCountry
          country={filteredCountries[0]}
          length={filteredCountries.length}
        />
      )}
      <p>{message}</p>
    </>
  );
}

export default App;
