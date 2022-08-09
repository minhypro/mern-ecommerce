import axiosClient from './axiosClient'
import axios from 'axios'

const usersApi = {
    login: (email, password) => {
        return axiosClient.post('/api/users/login', {
            email,
            password,
        })
    },
    register: (name, email, password) => {
        return axiosClient.post('/api/users/', {
            name,
            email,
            password,
        })
    },
    getProfile: (id, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: {
                'test': 'text'
            }
        }
        return axiosClient.get(
            `/api/users/${id}`, config )
    },

    updateProfile: (user, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }
        return axiosClient.put(
            `/api/users/profile`, user, config )
    },
    
}

export default usersApi
