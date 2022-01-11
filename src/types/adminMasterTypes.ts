import {city} from "./adminCityTypes";

export interface master{
    id: number,
    name: string,
    email: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    cities: Array<city>
}

export interface AdminMasterStateType {
    masters: Array<master>
    newMaster: string
    isFetch: boolean
    error: string | null
}

export enum AdminMastersActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    FETCH_MASTERS = 'FETCH_MASTERS',
    DELETE_MASTER = "DELETE_MASTER",
    SET_MASTER_NAME = "SET_MASTER_NAME",
    ADD_MASTER="ADD_MASTER",
    CHANGE_MASTER_NAME= "CHANGE_MASTER_NAME",
}

type fetchActionPayload = {
    payload: boolean
}

export interface fetchAction {
    type: AdminMastersActionTypes.FETCH_START;
    payload: fetchActionPayload
}

type fetchErrorActionPayload = {
    payload: string
}

export interface fetchErrorAction {
    type: AdminMastersActionTypes.FETCH_ERROR;
    payload: fetchErrorActionPayload
}

type fetchMastersActionPayload = {
    payload: Array<master>
}

export interface fetchMastersAction {
    type: AdminMastersActionTypes.FETCH_MASTERS;
    payload: fetchMastersActionPayload
}

type deleteMasterActionPayload = {
    payload: master
}

export interface deleteMasterAction{
    type: AdminMastersActionTypes.DELETE_MASTER;
    payload: deleteMasterActionPayload
}

type setMasterNameActionPayload = {
    payload: string
}

export interface setMasterNameAction{
    type: AdminMastersActionTypes.SET_MASTER_NAME;
    payload: setMasterNameActionPayload
}

type addMasterActionPayload = {
    payload: master
}

export interface addMasterAction{
    type: AdminMastersActionTypes.ADD_MASTER;
    payload: addMasterActionPayload
}

type changeMasterNameActionPayload = {
    payload: master
}

export interface changeMasterNameAction{
    type: AdminMastersActionTypes.CHANGE_MASTER_NAME;
    master: changeMasterNameActionPayload,
}



export type AdminMasterAction = fetchAction |
    fetchErrorAction |
    fetchMastersAction |
    deleteMasterAction |
    setMasterNameAction |
    addMasterAction |
    changeMasterNameAction
