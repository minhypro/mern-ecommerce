import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/userConstants'
import usersApi from '../api/usersApi'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const data = await usersApi.login(email, password)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', data ? JSON.stringify(data) : {})
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}
