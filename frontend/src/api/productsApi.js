import axiosClient from './axiosClient'

const productsApi = {
  getAllProducts: () => {
    return axiosClient.get('/api/products')
  },
  getProduct: (id) => {
    return axiosClient.get('/api/products/' + id)
  },
  deleteProduct: (id, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.delete(`/api/products/${id}/delete`, config)
  },
  addProduct: (product, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.post(`/api/products/add`, product, config)
  },
}

export default productsApi
