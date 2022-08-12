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
    listMyOrders: (token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.get(`/api/orders/myorders`, config)
    },
    orderSentpayment: (id, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.put(`/api/orders/${id}/sentpayment`, config)
    },
}

export default ordersApi
