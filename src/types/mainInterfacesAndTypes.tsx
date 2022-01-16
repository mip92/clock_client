import {Master} from "./adminMasterTypes";

export interface City {
    cityName: string,
    createdAt: string,
    id: number,
    updatedAt: string,
}

export interface Time {
    id: number,
    time: string,
}

export interface Clock {
    small:boolean,
    middle: boolean,
    big: boolean,
}

export type BooleanPayload = {
    payload: boolean
}

export type StringOrNullPayload = {
    payload: string | null
}

export type StringPayload = {
    payload: string
}

export type CityPayload = {
    payload: City
}

export type MasterPayload = {
    payload: Master
}