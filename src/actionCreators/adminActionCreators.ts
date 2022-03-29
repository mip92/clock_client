import {Dispatch} from "react"
import {
    AuthAction,
    AuthActionTypes,
    FetchAction,
    FetchErrorAction,
    SetAuthEmailAction,
    SetAuthPasswordAction, SetAuthRoleAction, SetStatusCode, SetTokenAction
} from "../types/authTypes"
import $api from "../http";


export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: AuthActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error: string | null): FetchErrorAction => {
    return {
        type: AuthActionTypes.FETCH_ERROR,
        payload: {payload: error}
    }
}
export const loginAuth = (email: string, password: string, history: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.post(`/admin/login`, {
                email,
                password
            })
            dispatch({
                type: AuthActionTypes.LOGIN,
                payload: {payload: response.data.token}
            })
            dispatch(setRole(response.data.token))
            dispatch(fetchStart(false))
            localStorage.setItem('token', response.data.token);
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
export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: AuthActionTypes.LOGOUT
    }
}

export const setAuthEmail = (email: string): SetAuthEmailAction => {
    return {
        type: AuthActionTypes.SET_ADMIN_EMAIL,
        payload: {payload: email}
    }
}

export const setRole = (token: string | null): SetAuthRoleAction => {
    if (!token) return {
        type: AuthActionTypes.SET_ROLE,
        payload: {payload: null}
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const obj = JSON.parse(jsonPayload)
    return {
        type: AuthActionTypes.SET_ROLE,
        payload: {payload: obj.role}
    }
}

export const setAuthPassword = (password: string): SetAuthPasswordAction => {
    return {
        type: AuthActionTypes.SET_ADMIN_PASSWORD,
        payload: {payload: password}
    }
}
export const setStatus = (code: number): SetStatusCode => {
    return {
        type: AuthActionTypes.STATUS,
        payload: {payload: code}
    }
}
export const setToken = (): SetTokenAction => {
    let token: string | null = localStorage.getItem('token');
    return {
        type: AuthActionTypes.SET_TOKEN,
        payload: {payload: token}
    }
}


