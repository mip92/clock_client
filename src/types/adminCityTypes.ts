import {BooleanPayload, City, CityPayload, StringPayload} from "./mainInterfacesAndTypes";

export interface AdminCitiesStateType {
    cities: City[]
    citiesCount:number
    newCity: string
    isFetch: boolean
    error: string | null
    totalPages: number
    pagesArray: number[]
}

export enum AdminCitiesActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    FETCH_CITIES = 'FETCH_CITIES',
    DELETE_CITY = "DELETE_CITY",
    SET_CITY_NAME = "SET_CITY_NAME",
    ADD_CITY="ADD_CITY",
    CHANGE_CITY_NAME= "CHANGE_CITY_NAME",
}


export interface FetchAction {
    type: AdminCitiesActionTypes.FETCH_START;
    payload: BooleanPayload
}

export interface FetchErrorAction {
    type: AdminCitiesActionTypes.FETCH_ERROR;
    payload: StringPayload
}

type FetchCitiesActionPayload = {
    cities: City[]
    citiesCount: number
    totalPages: number
    pagesArray:number[]
}

export interface FetchCitiesAction {
    type: AdminCitiesActionTypes.FETCH_CITIES;
    payload: FetchCitiesActionPayload
}

export interface DeleteCityAction {
    type: AdminCitiesActionTypes.DELETE_CITY;
    payload: CityPayload
}

export interface SetCityNameAction {
    type: AdminCitiesActionTypes.SET_CITY_NAME;
    payload: StringPayload
}

export interface AddCityAction {
    type: AdminCitiesActionTypes.ADD_CITY;
    payload: CityPayload
}

export interface ChangeCityNameAction{
    type: AdminCitiesActionTypes.CHANGE_CITY_NAME;
    city: CityPayload,
}

export type AdminCitiesAction = FetchAction |
    FetchErrorAction |
    FetchCitiesAction |
    DeleteCityAction |
    SetCityNameAction |
    AddCityAction |
    ChangeCityNameAction