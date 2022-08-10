import axiosClient from './axiosClient'

const ordersApi = {
    createOrder: (order, token) => {

        console.log(order, 'test2');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.post('/api/orders/', order, config)
    },
}

export default ordersApi
