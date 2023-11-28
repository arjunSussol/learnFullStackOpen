import { useEffect, useState } from "react"

import getWeatherServices from './services/countries';

type Icon ={
    icon: string;
}

export const Weather = ({capital}: {capital: string}) => {
    const[message, setMessage] = useState('');
    const[city, setCity] = useState({
        name: '',
        weather: [],
        main: {
            temp: 0
        },
        wind: {
            speed: 0
        }
    });

    useEffect(() => {
        getWeatherServices
            .getWeatherByCityName(capital)
            .then(data => {
                if (data.status === 404) {
                    setMessage('City not found!');
                } else{
                    setCity(data);
                    setMessage('');
                }
        })
    }, [capital]);

    if (!city.name) return null;
    if (message) return <h2>{message}</h2>

    return(
        <div>
            <h2>Weather in the {city.name}</h2>
            <p>temperature {city.main.temp} celcius</p>
            <ul>{city.weather.map((i: Icon, index: number) => <img key={index} src={`http://openweathermap.org/img/w/${i.icon}.png`} />)}</ul>
            <p>wind {city.wind.speed} m/s</p>
        </div>
    )
}