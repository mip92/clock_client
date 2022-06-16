import {Master} from "./adminMasterTypes";
import {Order} from "../store/reducers/workplaceReducer";
import {CalendarStateType, FORMAT, OneCalendarItem} from "./calendarTypes";

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
    small: boolean,
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
        arrayPictureId: number[]
    }
}
export type ChangeStatusPayload = {
    payload: {
        orderId: number,
        status: string
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

export type FormatPayload = {
    payload: FORMAT
}

export interface MyError {
    value: string,
    msg: string,
    param: string,
    location: string
}

export type ErrorOrNullPayload = {
    payload: MyError | null
}

export type CorrectMondayPayload = {
    payload: {
        monday: string,
        numberOfWeek: number
    }
}

export type FetchCalendarPayload = {
    payload: OneCalendarItem[]
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

export type NavBarLinksPayload = {
    payload: NavBarLink[]
}
