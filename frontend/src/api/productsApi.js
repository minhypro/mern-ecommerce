import axiosClient from './axiosClient'

const productsApi = {
  getAllProducts: (keyword) => {

    if (keyword) {
      return axiosClient.get(`/api/products?keyword=${keyword}`)

    } else {
      return axiosClient.get(`/api/products`)
    }

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
  updateProduct: (product, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.put(`/api/products/${product.id}/update`, product, config)
  },
  createProductReview: (productId, review, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.post(`/api/products/${productId}/reviews`, review, config)
  },
}

export default productsApi
