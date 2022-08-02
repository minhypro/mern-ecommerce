import axiosClient from './axiosClient'

const usersApi = {
    login: (email, password) => {
        return axiosClient.post('/api/users/login', {
            email,
            password,
        })
    },
}

export default usersApi
