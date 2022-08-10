import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from '../constants/orderConstants'
import ordersApi from '../api/ordersApi'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()
        const data = await ordersApi.createOrder(order, userInfo.token)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()
        const data = await ordersApi.getOrderById(id, userInfo.token)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err,
        })
    }
}
