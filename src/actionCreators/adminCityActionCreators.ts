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


export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: AdminCitiesActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error?: string | null): FetchErrorAction => {
    return {
        type: AdminCitiesActionTypes.FETCH_ERROR,
        payload: {payload: error || "An error occurred while loading"}
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
            let response = await $api.get(`/cities?offset=${offset}&limit=${limit}`)
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
export const changeCityName = (id: number, city: string) => {
    return async (dispatch: Dispatch<AdminCitiesAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.put(`/cities/${id}`, {cityName: city})
            dispatch({
                type: AdminCitiesActionTypes.CHANGE_CITY_NAME,
                city: {payload: response.data}
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


