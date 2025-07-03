import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import node from "./services/node";
import Notification from "./components/Notification";

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [checkError, setCheckError] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const handleNameChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
    console.log(event.target.value);
  };

  const addName = (event) => {
    console.log(event);
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newPhone,
    };

    if (
      persons.some(
        (person) =>
          person.name === newName &&
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
      )
    ) {
      const id = persons.find((person) => person.name === newName).id;
      node
        .updatePerson(id, newObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.name === newName ? returnedPerson : person
            )
          );
          setNewName("");
          setNewPhone("");
          alert(`Updated ${newName}'s phone number`);
        })
        .catch((error) => {
          console.error("Error updating person:", error);
          setCheckError(true);
          setMessage(
            `Information of ${newName} has already been removed from server`
          );
          setNewName("");
          setNewPhone("");
        });
    } else {
      node.createPerson(newObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
      });
    }
  };

  useEffect(() => {
    node.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} checkError={checkError} />
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Person handleDeletePerson={handleDeletePerson} filPersons={filPersons} />
    </div>
  );
};

export default App;
