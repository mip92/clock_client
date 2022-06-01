import {
    BooleanPayload,
    ErrorOrNullPayload, MyError,
    NumberPayload,
    StringOrNullPayload,
    StringPayload
} from "./mainInterfacesAndTypes";
import {Role} from "../enums/Roles";
export type UrlByRole = {
    [key in Role]
}
export interface AuthStateType {
    isAdminFound: boolean,
    isFetch: boolean,
    error: null | MyError,
    token: null | string,
    authName: string,
    authEmail: string,
    status: number,
    role: Role | null,
    id: null | number,
}

export enum AuthActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    SET_ADMIN_EMAIL = "SET_ADMIN_EMAIL",
    SET_ADMIN_NAME = "SET_ADMIN_NAME",
    SET_TOKEN = "SET_TOKEN",
    SET_ROLE_AND_ID = "SET_ROLE_AND_ID",
    CHANGE_EMAIL = "CHANGE_EMAIL",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    STATUS = "STATUS"
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

export interface SetAuthRoleAction {
    type: AuthActionTypes.SET_ROLE_AND_ID;
    payload: { rolePayload: Role | null, idPayload: number | null }
}

export interface SetAuthNameAction {
    type: AuthActionTypes.SET_ADMIN_NAME;
    payload: StringPayload
}

export interface FetchErrorAction {
    type: AuthActionTypes.FETCH_ERROR
    payload: ErrorOrNullPayload
}

export type AuthAction = FetchAction |
    FetchErrorAction |
    SetAuthEmailAction |
    SetAuthNameAction |
    LoginAction |
    SetTokenAction |
    LogoutAction |
    SetStatusCode |
    SetAuthRoleAction