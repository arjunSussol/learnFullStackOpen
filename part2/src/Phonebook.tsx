import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import phonebookService from './services/persons';

type Person = {
    name: string;
    number: string;
    id: number;
}

export const Phonebook = () => {
    const[newName, setNewName] = useState({name: '', number: ''});
    const[persons, setPersons] = useState([]);
    const[search, setSearch] = useState('');

    useEffect(() => {
        phonebookService.getAll().then(initialPersons => setPersons(initialPersons))
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const person: Person = persons?.find(({name}) => name === newName.name) ?? {name: '', number: '', id: 0};
        console.log(person);
        if (person.name) {
            if (person.number !== newName.number) {
                const isUpdate: boolean = confirm(`${person.name} is already added to phonebook, replace the old number ${person.number} with new one ${newName.number}?`);
                if (isUpdate) {
                    const personUpdated = {...person, number: newName.number};
                    phonebookService
                    .update(person.id, personUpdated)
                    .then(updatedPerson => setPersons(persons.filter((n: Person) => n.id !== person.id).concat(updatedPerson)))
                }
            }
        } else {
            phonebookService
                .create(newName)
                .then(createdPerson => setPersons(persons.concat(createdPerson)))
                .catch(error => console.log(error.message));
        }
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === 'search') {
            setSearch(value);
            setPersons(persons.filter((record: Person) => record.name.includes(value)))
        } else {
            setNewName({...newName, [name]: value});
        }
    }

    const handleDelete = (id: number) => {
        const nameToBeDeleted: Person = persons.find((person: Person) => person.id === id ) ?? {name: '', number: '', id};
        console.log(nameToBeDeleted);
        if (confirm(`Delete ${nameToBeDeleted.name}?`)) {
            phonebookService.deleteById(id).then(response => {
                if (response.status === 200) {
                    setPersons(persons.filter((person: Person) => person.id !== id));
                }
            }).catch(error => alert(error.message));
        }
    }

    return(
        <div>
            <h2>Phonebook</h2>
            <div>Search: <input type="text" name="search" value={search} onChange={handleOnChange} /></div>
            <form onSubmit={handleSubmit}>
                <div>name: <input type="text" name="name" value={newName.name} onChange={handleOnChange} /></div>
                <div>number: <input type="text" name="number" value={newName.number} onChange={handleOnChange}/></div>
                <button type="submit">add</button>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(({name, number, id}: Person) => <li key={id}>{name} {number} <button onClick={() => handleDelete(id)}>delete</button></li>)}
            </ul>
        </div>
    )
}