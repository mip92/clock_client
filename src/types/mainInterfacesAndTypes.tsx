import {Master} from "./adminMasterTypes";
import {Order} from "../store/reducers/workplaceReducer";

export interface City {
    cityName: string,
    price: number,
    createdAt: string,
    id: number,
    updatedAt: string,
}

export interface Time {
    id: number,
    time: string,
}

export interface NavBarLink {
    to: string,
    name: string
}

export interface Clock {
    small:boolean,
    middle: boolean,
    big: boolean,
}


export type BooleanPayload = {
    payload: boolean
}

export type OrdersPayload = {
    payload: Order[]
}
export type RemovePicturesPayload = {
    payload: {
        orderId: number,
        arrayPictureId:number[]
    }
}

export type NumberPayload = {
    payload: number
}

export type StringOrNullPayload = {
    payload: string | null
}

export type StringPayload = {
    payload: string
}

export interface MyError {
    value :string,
    msg:string,
    param:string,
    location:string
}
export type ErrorOrNullPayload={
    payload: MyError | null
}

export type CityPayload = {
    payload: City
}

export type CitiesPayload = {
    payload: City[]
}


export type MasterPayload = {
    payload: Master
}

export type NavBarLinksPayload={
    payload: NavBarLink[]
}
