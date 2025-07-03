const Person = ({ handleDeletePerson, filPersons }) => {
  return (
    <div>
      {filPersons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={handleDeletePerson} id={person.id}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Person;
