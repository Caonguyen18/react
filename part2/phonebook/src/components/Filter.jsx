const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div>
      <p>Filter shown with</p>
      <input onChange={handleFilterChange} value={filter} />
    </div>
  );
};

export default Filter;
