import axiosClient from './axiosClient'

const ordersApi = {
    createOrder: (order, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.post('/api/orders/', order, config)
    },
    getOrderById: (id, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.get(`/api/orders/${id}`, config)
    },
}

export default ordersApi
