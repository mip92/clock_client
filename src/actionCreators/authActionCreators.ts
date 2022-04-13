import {Dispatch} from "react"
import {
    AuthAction,
    AuthActionTypes,
    FetchAction, FetchErrorAction,
    SetAuthEmailAction,
    SetAuthNameAction, SetAuthRoleAction, SetStatusCode, SetTokenAction
} from "../types/authTypes"
import $api from "../http";
import {ErrorOrNullPayload, MyError} from "../types/mainInterfacesAndTypes";


export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: AuthActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error: MyError | null): FetchErrorAction  => {
    return {
        type: AuthActionTypes.FETCH_ERROR,
        payload:{payload:error}
    }
}
export const loginAuth = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.post(`/auth/login`, {
                email,
                password
            })
            dispatch({
                type: AuthActionTypes.LOGIN,
                payload: {payload: response.data.token}
            })
            dispatch(setAuthEmail(email))
            dispatch(setAuthName(response.data.name))
            dispatch(setRole(response.data.token))
            dispatch(fetchStart(false))
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            dispatch(fetchStart(false))
            const error: MyError= JSON.parse(JSON.parse(e.request.responseText).message)
            console.log(error)
            dispatch(fetchError(error))
        }
    }
}
export const changeEmailAuth = (currentEmail: string, newEmail: string, password: string, role:string|null) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch(fetchStart(true))
            let url
            if (role=="MASTER") url=`/masters/changeEmail`
            else if (role=="USER") url=`/users/changeEmail`
            const response = await $api.put(url, {
                currentEmail,
                newEmail,
                password,
                role
            })
            dispatch({
                type: AuthActionTypes.LOGIN,
                payload: {payload: response.data.token}
            })
            dispatch(setRole(response.data.token))
            dispatch(fetchStart(false))
            localStorage.setItem('token', response.data.token);

        } catch (e) {
            dispatch(fetchStart(false))
            const error: MyError= JSON.parse(JSON.parse(e.request.responseText).message)
            console.log(error)
            dispatch(fetchError(error))
        }
    }
}
export interface IRigistrationData {
    citiesId: number[],
    email: string
    isMaster: boolean
    isRulesChecked: boolean
    name: string
    firstPassword: string
    secondPassword: string
}
export const RigistrationAuth = (data: IRigistrationData) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch(fetchStart(true))
            const response =await $api.post(`/auth/registration/`, data)
            dispatch({
                type: AuthActionTypes.LOGIN,
                payload: {payload: response.data.token}
            })
            dispatch(setRole(response.data.token))
            dispatch(fetchStart(false))
            localStorage.setItem('token', response.data.token);
            dispatch(fetchError(null))
        } catch (e) {
            dispatch(fetchStart(false))
            const error: MyError= JSON.parse(JSON.parse(e.request.responseText).message)
            dispatch(fetchError(error))
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
        type: AuthActionTypes.SET_ROLE_AND_ID,
        payload: {rolePayload: null, idPayload:null}
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const obj = JSON.parse(jsonPayload)
    return {
        type: AuthActionTypes.SET_ROLE_AND_ID,
        payload: {rolePayload: obj.role, idPayload:obj.id}
    }
}

export const setAuthName = (naame: string): SetAuthNameAction => {
    return {
        type: AuthActionTypes.SET_ADMIN_NAME,
        payload: {payload: naame}
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

