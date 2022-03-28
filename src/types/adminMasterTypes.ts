import {BooleanPayload, City, MasterPayload, StringPayload} from "./mainInterfacesAndTypes";

export interface Master {
    id: number,
    name: string,
    email: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    cities: City[]
    isActivated: boolean
    isApproved: boolean
    role: string
}

export interface AdminMasterStateType {
    masters: Master[]
    newMaster: string
    isFetch: boolean
    error: string | null
}

export enum AdminMastersActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    FETCH_MASTERS = 'FETCH_MASTERS',
    SET_MASTERS = 'SET_MASTERS',
    DELETE_MASTER = "DELETE_MASTER",
    APPROVE_MASTER = "APPROVE_MASTER",
    SET_MASTER_NAME = "SET_MASTER_NAME",
    ADD_MASTER="ADD_MASTER",
    CHANGE_MASTER_NAME= "CHANGE_MASTER_NAME",
}

export interface FetchAction {
    type: AdminMastersActionTypes.FETCH_START;
    payload: BooleanPayload
}

export interface FetchErrorAction {
    type: AdminMastersActionTypes.FETCH_ERROR;
    payload: StringPayload
}

type FetchMastersActionPayload = {
    payload: Master[]
}

export interface SetMastersAction {
    type: AdminMastersActionTypes.SET_MASTERS;
    payload: FetchMastersActionPayload
}

export interface FetchMastersAction {
    type: AdminMastersActionTypes.FETCH_MASTERS;
    payload: FetchMastersActionPayload
}

export interface DeleteMasterAction {
    type: AdminMastersActionTypes.DELETE_MASTER;
    payload: MasterPayload
}

export interface ApproveMasterAction {
    type: AdminMastersActionTypes.APPROVE_MASTER;
    payload: MasterPayload
}

export interface SetMasterNameAction {
    type: AdminMastersActionTypes.SET_MASTER_NAME;
    payload: StringPayload
}

export interface AddMasterAction {
    type: AdminMastersActionTypes.ADD_MASTER;
    payload: MasterPayload
}

export interface ChangeMasterNameAction {
    type: AdminMastersActionTypes.CHANGE_MASTER_NAME;
    master: MasterPayload,
}

export type AdminMasterAction = FetchAction |
    FetchErrorAction |
    FetchMastersAction |
    DeleteMasterAction |
    SetMasterNameAction |
    AddMasterAction |
    ChangeMasterNameAction |
    ApproveMasterAction |
    SetMastersAction
