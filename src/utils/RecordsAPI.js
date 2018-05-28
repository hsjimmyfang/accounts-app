import axios from 'axios';

const api= process.env.REACT_APP_RECORDS_API_URL || 'https://5b0c06eebf654100148709b7.mockapi.io';

export const getAll= ()=>
    axios.get(`${api}/api/v1/records`)

export const create= (data) =>
    axios.post(`${api}/api/v1/records`,data)