import axiosClient from './axiosClient';

const productsApi = {
    getAllProducts: () => {
        return axiosClient.get('/api/products/')
    },
    getProduct: (id) => {
        return axiosClient.get('/api/products/' + id)
    }
}

export default productsApi