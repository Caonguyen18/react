import { useState } from "react";
import node from "../services/node";

const PersonForm = ({ persons, setPersons }) => {
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
          alert(
            `Failed to update ${newName}'s phone number. Please try again later.`
          );
        });
    } else {
      node.createPerson(newObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
      });
    }
  };

  return (
    <form onSubmit={addName}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handlePhoneChange} value={newPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
