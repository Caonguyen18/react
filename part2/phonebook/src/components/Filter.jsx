const Filter = ({ handleFilterChange, filter }) => {
  return (
    <div>
      <p>Filter shown with</p>
      <input onChange={handleFilterChange} value={filter} />
    </div>
  );
};

export default Filter;
