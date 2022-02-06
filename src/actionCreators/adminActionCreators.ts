import {Dispatch} from "react"
import {
    AdminAction,
    AdminActionTypes,
    FetchAction,
    FetchErrorAction,
    SetAdminEmailAction,
    SetAdminPasswordAction, SetTokenAction
} from "../types/adminTypes"
import $api from "../http";


export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: AdminActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error: string | null): FetchErrorAction => {
    return {
        type: AdminActionTypes.FETCH_ERROR,
        payload: {payload: error}
    }
}
export const loginAdmin = (email: string, password: string, history: any) => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.post(`/admin/login`, {
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

export const setAdminEmail = (email: string): SetAdminEmailAction => {
    return {
        type: AdminActionTypes.SET_ADMIN_EMAIL,
        payload: {payload: email}
    }
}

export const setAdminPassword = (password: string): SetAdminPasswordAction => {
    return {
        type: AdminActionTypes.SET_ADMIN_PASSWORD,
        payload: {payload: password}
    }
}
export const setToken = (): SetTokenAction => {
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


