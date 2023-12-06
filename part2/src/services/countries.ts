import axios from "axios";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const countryURL = 'https://studies.cs.helsinki.fi/restcountries/api/name';
const weatherURL = 'https://api.openweathermap.org/data/2.5';
// const weatherIcon = 'http://openweathermap.org/img/w/';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
// Your API key is db0019eba4950cb685db89cf26de042f
const getAll = () => axios.get(baseURL).then(response => response.data);

const getByName = (name: string) => axios.get(`${countryURL}/${name}`).then(response => response.data);

const getWeatherByCityName = (city: string) => axios
                                                    .get(`${weatherURL}/weather?q=${city}&appid=${apiKey}`)
                                                    .then(response => response.data)
                                                    .catch(error => error.response);

export default {getAll, getByName, getWeatherByCityName}