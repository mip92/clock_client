export interface city{
    city_name: string
    createdAt: string
    id: number
    updatedAt: string
}

export interface AdminCitiesStateType {
    cities: Array<city>
    citiesCount:number
    newCity: string
    isFetch: boolean
    error: string | null
    totalPages: number
    pagesArray: Array<number>
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

type fetchActionPayload = {
    payload: boolean
}

export interface fetchAction {
    type: AdminCitiesActionTypes.FETCH_START;
    payload: fetchActionPayload
}

type fetchErrorActionPayload = {
    payload: string
}

export interface fetchErrorAction {
    type: AdminCitiesActionTypes.FETCH_ERROR;
    payload: fetchErrorActionPayload
}

type fetchCitiesActionPayload = {
    cities: Array<city>
    citiesCount: number
    totalPages: number
    pagesArray:Array<number>
}

export interface fetchCitiesAction {
    type: AdminCitiesActionTypes.FETCH_CITIES;
    payload: fetchCitiesActionPayload
}

type deleteCityActionPayload = {
    payload: city
}

export interface deleteCityAction{
    type: AdminCitiesActionTypes.DELETE_CITY;
    payload: deleteCityActionPayload
}

type setCityNameActionPayload = {
    payload: string
}

export interface setCityNameAction{
    type: AdminCitiesActionTypes.SET_CITY_NAME;
    payload: setCityNameActionPayload
}

type addCityActionPayload = {
    payload: city
}

export interface addCityAction{
    type: AdminCitiesActionTypes.ADD_CITY;
    payload: addCityActionPayload
}

type changeCityNameActionPayload = {
    payload: city
}

export interface changeCityNameAction{
    type: AdminCitiesActionTypes.CHANGE_CITY_NAME;
    city: changeCityNameActionPayload,
}



export type AdminCitiesAction = fetchAction |
    fetchErrorAction |
    fetchCitiesAction |
    deleteCityAction |
    setCityNameAction |
    addCityAction |
    changeCityNameAction