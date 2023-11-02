import axios from "axios";

const baseURL = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseURL).then(response => response.data);

const create = (newObject: object) => axios.post(baseURL, newObject).then(response => response.data);

const update = (id: number, newObject: object) => axios.put(`${baseURL}/${id}`, newObject).then(response => response.data);

const deleteById = (id: number) => axios.delete(`${baseURL}/${id}`).then(response => response);

export default {getAll, create, update, deleteById}