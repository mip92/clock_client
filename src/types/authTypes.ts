import {
    BooleanPayload,
    ErrorOrNullPayload, MyError,
    NumberPayload,
    StringOrNullPayload,
    StringPayload
} from "./mainInterfacesAndTypes";

export interface AuthStateType {
    isAdminFound: boolean,
    isFetch: boolean,
    error: null | MyError,
    token: null | string,
    authEmail: string,
    authPassword: string,
    status: number,
    role: null | string,
    id: null | number,
}

export enum AuthActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    SET_ADMIN_EMAIL = "SET_ADMIN_EMAIL",
    SET_ADMIN_PASSWORD="SET_ADMIN_PASSWORD",
    SET_TOKEN="SET_TOKEN",
    SET_ROLE_AND_ID="SET_ROLE_AND_ID",
    LOGIN="LOGIN",
    LOGOUT="LOGOUT",
    STATUS="STATUS"
}

export interface FetchAction {
    type: AuthActionTypes.FETCH_START;
    payload: BooleanPayload
}

export interface SetStatusCode {
    type: AuthActionTypes.STATUS;
    payload: NumberPayload
}

export interface SetTokenAction {
    type: AuthActionTypes.SET_TOKEN;
    payload: StringOrNullPayload
}

export interface LoginAction {
    type: AuthActionTypes.LOGIN;
    payload: StringPayload
}

export interface LogoutAction {
    type: AuthActionTypes.LOGOUT;
}

export interface SetAuthEmailAction {
    type: AuthActionTypes.SET_ADMIN_EMAIL;
    payload: StringPayload
}

export interface SetAuthRoleAction{
    type: AuthActionTypes.SET_ROLE_AND_ID;
    payload: {rolePayload: string | null, idPayload:number | null}
}

export interface SetAuthPasswordAction {
    type: AuthActionTypes.SET_ADMIN_PASSWORD;
    payload: StringPayload
}

export interface FetchErrorAction {
    type: AuthActionTypes.FETCH_ERROR
    payload: ErrorOrNullPayload
}

export type AuthAction = FetchAction |
    FetchErrorAction |
    SetAuthEmailAction |
    SetAuthPasswordAction |
    LoginAction |
    SetTokenAction |
    LogoutAction |
    SetStatusCode |
    SetAuthRoleAction