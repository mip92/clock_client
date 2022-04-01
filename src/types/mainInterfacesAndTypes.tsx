import {Master} from "./adminMasterTypes";
import {OrderInterface} from "../components/Admin/Order";

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
    payload: OrderInterface[]
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

export type CityPayload = {
    payload: City
}

export type MasterPayload = {
    payload: Master
}

export type NavBarLinksPayload={
    payload: NavBarLink[]
}
