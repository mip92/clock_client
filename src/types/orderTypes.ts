import {
    BooleanPayload, CitiesPayload, City,
    ErrorOrNullPayload, MyError, Time
} from "./mainInterfacesAndTypes";

export interface OrderStateType {
    isFetch: boolean,
    error: null | MyError,
    cities: City[],
    currentCity: number | null,
    time: Time[],
    dateTime: Date | null,
    clockSize: number | null,
    email: string,
    name: string,
    pictures: File[]
}

export enum OrderActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    SET_CITIES = "SET_CITIES",
    SET_ORDER = "SET_ORDER"
}

export interface FetchAction {
    type: OrderActionTypes.FETCH_START;
    payload: BooleanPayload
}

export interface FetchErrorAction {
    type: OrderActionTypes.FETCH_ERROR
    payload: ErrorOrNullPayload
}

export interface SetCities {
    type: OrderActionTypes.SET_CITIES;
    payload: CitiesPayload
}

export interface SetOrder {
    type: OrderActionTypes.SET_ORDER;
    payload: {
        currentCity: number
        dateTime: Date,
        clockSize: number,
        email: string,
        name: string,
        pictures: File[]
    }
}


export type OrderAction = FetchAction |
    FetchErrorAction |
    SetCities | SetOrder