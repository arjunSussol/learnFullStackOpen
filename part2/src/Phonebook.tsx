import { ChangeEvent, FormEvent, useState } from "react"

export const Phonebook = () => {
    const[newName, setNewName] = useState({name: '', number: '', id: 0});
    const[persons, setPersons] = useState([{name: 'name', number: '0123456789', id: 1}]);
    const[search, setSearch] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const duplicateName = persons.find(({name}) => name === newName.name)?.name ?? '';
        if (duplicateName) {
            alert(`${duplicateName} is already added to phonebook`);
        } else {
            setPersons([...persons, {name: newName.name, number: newName.number, id: newName.id}]);  
        }
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === 'search') {
            setSearch(value);
            setPersons(persons.filter(({name}) => name.includes(value)));
        } else {
            setNewName({...newName, [name]: value, id: newName.id+1});
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
                {persons.map((person) => <li key={person.id}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )
}