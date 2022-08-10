import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
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

        console.log(data, 'test1');
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
