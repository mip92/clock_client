import {BooleanPayload, NumberPayload, StringOrNullPayload, StringPayload} from "./mainInterfacesAndTypes";

export interface AdminStateType {
    isAdminFound: boolean,
    isFetch: boolean,
    error: null | string,
    token: null | string,
    adminEmail: string,
    adminPassword: string,
    status: number
}

export enum AdminActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    SET_ADMIN_EMAIL = "SET_ADMIN_EMAIL",
    SET_ADMIN_PASSWORD="SET_ADMIN_PASSWORD",
    SET_TOKEN="SET_TOKEN",
    LOGIN="LOGIN",
    LOGOUT="LOGOUT",
    STATUS="STATUS"
}

export interface FetchAction {
    type: AdminActionTypes.FETCH_START;
    payload: BooleanPayload
}

export interface SetStatusCode {
    type: AdminActionTypes.STATUS;
    payload: NumberPayload
}

export interface SetTokenAction {
    type: AdminActionTypes.SET_TOKEN;
    payload: StringOrNullPayload
}

export interface LoginAction {
    type: AdminActionTypes.LOGIN;
    payload: StringPayload
}

export interface LogoutAction {
    type: AdminActionTypes.LOGOUT;
}

export interface SetAdminEmailAction {
    type: AdminActionTypes.SET_ADMIN_EMAIL;
    payload: StringPayload
}

export interface SetAdminPasswordAction {
    type: AdminActionTypes.SET_ADMIN_PASSWORD;
    payload: StringPayload
}

export interface FetchErrorAction {
    type: AdminActionTypes.FETCH_ERROR
    payload: StringOrNullPayload
}

export type AdminAction = FetchAction |
    FetchErrorAction |
    SetAdminEmailAction |
    SetAdminPasswordAction |
    LoginAction |
    SetTokenAction |
    LogoutAction |
    SetStatusCode