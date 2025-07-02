import node from "../services/node";

const Person = ({ persons, filter, setPersons }) => {
  const filPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeletePerson = (event) => {
    const id = event.target.id;
    if (window.confirm(`Delete ${id}?`)) {
      node
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert("Failed to delete person. Please try again later.");
        });
      console.log(id);
    }
  };

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
