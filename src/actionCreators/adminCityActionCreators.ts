import {Dispatch} from "react"
import {
    AdminCitiesAction,
    AdminCitiesActionTypes,
    FetchAction,
    FetchErrorAction,
    SetCityNameAction
} from "../types/adminCityTypes";
import {getPageCount, getPagesArray} from "../utils/pages";
import $api from "../http";
import {MyError} from "../types/mainInterfacesAndTypes";

export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: AdminCitiesActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error: MyError | null): FetchErrorAction  => {
    return {
        type: AdminCitiesActionTypes.FETCH_ERROR,
        payload:{payload:error}
    }
}

export const setCityName = (cityName: string): SetCityNameAction => {
    return {
        type: AdminCitiesActionTypes.SET_CITY_NAME,
        payload: {payload: cityName}
    }
}

export const fetchCities = (offset: number, limit: number) => {
    return async (dispatch: Dispatch<AdminCitiesAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.get(`/cities?offset=${offset}&limit=${limit}`)
            dispatch({
                type: AdminCitiesActionTypes.FETCH_CITIES,
                payload: {
                    cities: response.data.rows,
                    citiesCount: response.data.count,
                    totalPages: getPageCount(response.data.count, limit),
                    pagesArray: getPagesArray(getPageCount(response.data.count, limit)),
                }
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch(fetchError(error))
            setTimeout(async () => {
                dispatch(fetchError(null))
            }, 2000)
        }
    }
}

export const delOneCity = (id: number) => {
    return async (dispatch: Dispatch<AdminCitiesAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.delete(`/cities/${id}`)
            dispatch({
                type: AdminCitiesActionTypes.DELETE_CITY,
                payload: {payload: response.data.city},
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch(fetchError(error))
            setTimeout(async () => {
                dispatch(fetchError(null))
            }, 2000)
        }
    }
}
export const addOneCity = (city: string, price: number) => {
    return async (dispatch: Dispatch<AdminCitiesAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.post(`/cities/`, {city, price})
            dispatch({
                type: AdminCitiesActionTypes.ADD_CITY,
                payload: {payload: response.data},
            })
            dispatch(fetchStart(false))
            dispatch(fetchError(null))
        } catch (e) {
            dispatch(fetchStart(false))
            let error: MyError
            if (JSON.parse(e.request.responseText)?.hasOwnProperty('errors')===true)  error = JSON.parse(e.request.responseText).errors[0]
            else error = JSON.parse(e.request.responseText)
            dispatch(fetchError(error))
        }
    }
}
export const changeCityName = (id: number, city: string, price: number, activateInput:any, setIsOpen:any) => {
    return async (dispatch: Dispatch<AdminCitiesAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.put(`/cities/${id}`, {cityName: city, price})
            dispatch({
                type: AdminCitiesActionTypes.CHANGE_CITY_NAME,
                city: {payload: response.data}
            })
            dispatch(fetchStart(false))
            dispatch(fetchError(null))
            activateInput(false)
            setIsOpen(false)
        } catch (e) {
            dispatch(fetchStart(false))
            const error: MyError= JSON.parse(e.request.responseText).errors[0]
            dispatch(fetchError(error))
        }
    }
}


