export interface AdminStateType {
    isAdminFound: boolean,
    isFetch: boolean,
    error: null | string,
    token: null | string,
    adminEmail: string,
    adminPassword: string
}

export enum AdminActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    SET_ADMIN_EMAIL = "SET_ADMIN_EMAIL",
    SET_ADMIN_PASSWORD="SET_ADMIN_PASSWORD",
    SET_TOKEN="SET_TOKEN",
    LOGIN="LOGIN",
    LOGOUT="LOGOUT"
}

type fetchActionPayload = {
    payload: boolean
}
export interface fetchAction {
    type: AdminActionTypes.FETCH_START;
    payload: fetchActionPayload
}
type setTokenActionPayload = {
    payload: string | null
}
export interface setTokenAction {
    type: AdminActionTypes.SET_TOKEN;
    payload: setTokenActionPayload
}
type loginActionPayload = {
    payload: string
}

export interface loginAction {
    type: AdminActionTypes.LOGIN;
    payload: loginActionPayload
}

export interface logoutAction {
    type: AdminActionTypes.LOGOUT;
}

type setAdminEmailActionPayload = {
    payload: string
}

export interface setAdminEmailAction {
    type: AdminActionTypes.SET_ADMIN_EMAIL;
    payload: setAdminEmailActionPayload
}

type setAdminPasswordActionPayload = {
    payload: string
}

export interface setAdminPasswordAction {
    type: AdminActionTypes.SET_ADMIN_PASSWORD;
    payload: setAdminPasswordActionPayload
}

type fetchErrorActionPayload = {
    payload: null | string
}

export interface fetchErrorAction {
    type: AdminActionTypes.FETCH_ERROR
    payload: fetchErrorActionPayload
}

export type AdminAction = fetchAction |
    fetchErrorAction |
    setAdminEmailAction |
    setAdminPasswordAction |
    loginAction |
    setTokenAction |
    logoutAction