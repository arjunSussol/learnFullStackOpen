import { useEffect, useState } from "react"

import countriesService from './services/countries';

type CountryName = {
    name: {
        common: string;
    };
}

export const Country = () => {
    const[countries, setCountries] = useState([]);
    const[searchedCountries, setSearchedCountries] = useState([]);

    useEffect(() => {
        countriesService
            .getAll()
            .then(list => {            
                setCountries(list.map((n: CountryName) => n.name.common));
            })
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedCountries(countries.filter((country: string) => country.includes(e.target.value)));
    }

    return(
        <>
            <label>Find countries <input type="text" name="common" onChange={handleOnChange} /></label>
            {console.log(countries)}
            {searchedCountries.length > 10 ? <p>Too many matches, specifiy another filter</p> : searchedCountries.map((list, index) => <li key={index}>{list}</li>)}
        </>
    )
}