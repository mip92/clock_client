import {Master} from "./adminMasterTypes";
import {OrderInterface} from "../components/Admin/Orders/Order";
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

export interface picture {
    name: string;
    size: number
}

export type BooleanPayload = {
    payload: boolean
}

<<<<<<< HEAD
=======
export type OrdersPayload = {
    payload: Order[]
}

>>>>>>> registration
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
