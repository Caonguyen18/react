const ShowCountries = ({ filteredCountries, countriesServices, setFilterText, setFilteredCountries }) => {
  return (
    <div>
      {filteredCountries.map((country) => (
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button
            onClick={async () => {
              const countryData = await countriesServices.getCountryByName(
                country.name.common
              );
              setFilteredCountries([countryData]);
              setFilterText(country.name.common);
            }}
          >
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowCountries;