import {
    BooleanPayload, CitiesPayload, City, CityPayload,
    ErrorOrNullPayload, MyError, NumberPayload, Time
} from "./mainInterfacesAndTypes";

export interface OrderStateType {
    isFetch: boolean,
    error: null | MyError,
    cities: City[],
    currentCity : number | null,
    time: Time[],
    currentTime : number | null,
}

export enum OrderActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    SET_CITIES = "SET_CITIES",
    SET_CURRENT_CITY="SET_CURRENT_CITY",
    SET_CURRENT_TIME="SET_CURRENT_TIME",
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

export interface SetCurrentCity {
    type: OrderActionTypes.SET_CURRENT_CITY;
    payload: NumberPayload
}

export interface SetCurrentTime {
    type: OrderActionTypes.SET_CURRENT_TIME;
    payload: NumberPayload
}


export type OrderAction = FetchAction |
    FetchErrorAction |
    SetCities |
    SetCurrentCity |
    SetCurrentTime