import axiosClient from './axiosClient'

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
}

export default usersApi
