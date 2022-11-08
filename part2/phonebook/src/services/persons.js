import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return  request.then(response => response.data)
}

const removeFromContacts = (personId) => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const modify = (newPerson, personId) => {
    const request = axios.put(`${baseUrl}/${personId}`, newPerson)
    return request
}

export default {getAll, create, removeFromContacts, modify} 