import { Weather } from "./Weather";

type Country = {
    country: {
    name: {
        common: string;
        }
    capital: string[];
    area: number;
    languages: object;
    flags: {
        png: string;
        alt: string;
    };
}
}

export const CountryDetail = ({country}: Country) => {
    if(!country) return null;
    return(
        <>
            <div>
                <h2>{country.name.common}</h2>
                <div>Capital: {country.capital.map(cap => cap)}</div>
                <div>Area: {country.area > 0 ? country.area : ''}</div>
                <div><strong>Languages:</strong> {Object.values(country.languages).map((lang, index) => <li key={index}>{lang}</li>)}</div>
                <img src={country.flags.png} alt={country.flags.alt} height={100} width={100}/>
            </div>
            <Weather capital={country.capital[0]}/>
        </>
    )
}