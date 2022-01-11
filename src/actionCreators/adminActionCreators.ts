import axios from "axios"
import {Dispatch} from "react"
import {
    AdminAction,
    AdminActionTypes,
    fetchAction,
    fetchErrorAction,
    setAdminEmailAction,
    setAdminPasswordAction, setTokenAction
} from "../types/adminTypes"


export const fetchStart = (bol: boolean): fetchAction => {
    return {
        type: AdminActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error: string | null): fetchErrorAction => {
    return {
        type: AdminActionTypes.FETCH_ERROR,
        payload: {payload: error}
    }
}
export const loginAdmin = (email: string, password: string, history: any) => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/login`, {
                email,
                password
            })
            dispatch({
                type: AdminActionTypes.LOGIN,
                payload: {payload: response.data.token}
            })
            dispatch(fetchStart(false))
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('time', String(Date.now()));
            history.push('/menu')
        } catch (e) {
            dispatch(fetchStart(false))
            const error: string = JSON.parse(e.request.responseText).message
            dispatch(fetchError(error))
            setTimeout(async () => {
                dispatch(fetchError(null))
            }, 2000)
        }
    }
}
export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('time')
    return{
        type: AdminActionTypes.LOGOUT
    }
}

export const setAdminEmail = (email: string): setAdminEmailAction => {
    return {
        type: AdminActionTypes.SET_ADMIN_EMAIL,
        payload: {payload: email}
    }
}

export const setAdminPassword = (password: string): setAdminPasswordAction => {
    return {
        type: AdminActionTypes.SET_ADMIN_PASSWORD,
        payload: {payload: password}
    }
}
export const setToken = (): setTokenAction => {
    let token: string | null = localStorage.getItem('token');
    let time: string | null = localStorage.getItem('time');
    if (time) {
        if (Date.now() - +time > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('token')
            localStorage.removeItem('time')
        }
    }
    return {
        type: AdminActionTypes.SET_TOKEN,
        payload: {payload: token}
    }
}


