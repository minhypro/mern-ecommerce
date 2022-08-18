import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
} from '../constants/productConstants'
import productsApi from '../api/productsApi'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const data = await productsApi.getAllProducts()

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })

    const data = await productsApi.getProduct(id)

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response,
    })
  }
}

export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await productsApi.deleteProduct(id, userInfo.token)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: err,
    })
  }
}

export const addProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_ADD_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const reqBody = { ...product, user: userInfo._id }

    await productsApi.addProduct(reqBody, userInfo.token)

    dispatch({
      type: PRODUCT_ADD_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: err,
    })
  }
}
