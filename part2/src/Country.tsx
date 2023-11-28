import { useEffect, useState } from "react"

import countriesService from './services/countries';
import { CountryDetail } from "./CountryDetail";

type Details = {
    name: {
        common: string;
        }
}

export const Country = () => {
    const[countries, setCountries] = useState([]);
    const[searchedCountries, setSearchedCountries] = useState([]);
    const[countryName, setCountryName] = useState('');
    const[country, setCountry] = useState({
        name: {
            common: ''
            },
        capital: [],
        area: 0,
        languages: {},
        flags: {
            png: '',
            alt: ''
        }
    });

    useEffect(() => {
        countriesService
            .getAll()
            .then(list => {            
                setCountries(list.map((n: Details) => n.name.common));
            })
    }, []);

    useEffect(() => {
        if(searchedCountries.length === 1) setCountryName(searchedCountries[0]);
        if (countryName !== '') {
            countriesService
                .getByName(countryName)
                .then(details => {
                    setCountry(details);
                });
        } 
    }, [searchedCountries, countryName])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedCountries(countries.filter((country: string) => country.includes(e.target.value)));
    }

    return(
        <>
            <label>Find countries <input type="text" name="common" onChange={handleOnChange} /></label>
            <div style={{paddingTop: 10}}>
                {searchedCountries.length > 10 ? <p>Too many matches, specifiy another filter</p> : searchedCountries.map((list, index) => <li key={index}><button onClick={() => setCountryName(list)}>{list}</button></li>)}
            </div>
            <CountryDetail country={country}/>
        </>
    )
}