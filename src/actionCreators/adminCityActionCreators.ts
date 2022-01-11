import axios from "axios"
import {Dispatch} from "react"
import {
    AdminCitiesAction,
    AdminCitiesActionTypes,
    fetchAction,
    fetchErrorAction,
    setCityNameAction
} from "../types/adminCityTypes";
import {getPageCount, getPagesArray} from "../utils/pages";


export const fetchStart = (bol: boolean): fetchAction => {
    return {
        type: AdminCitiesActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error?: string | null): fetchErrorAction => {
    return {
        type: AdminCitiesActionTypes.FETCH_ERROR,
        payload: {payload: error || "An error occurred while loading"}
    }
}

export const setCityName = (cityName: string): setCityNameAction => {
    return {
        type: AdminCitiesActionTypes.SET_CITY_NAME,
        payload: {payload: cityName}
    }
}

export const fetchCities = (offset: number, limit: number) => {
    return async (dispatch: Dispatch<AdminCitiesAction>) => {
        try {
            dispatch(fetchStart(true))
            let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/cities?offset=${offset}&limit=${limit}`)
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
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/cities/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
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
export const addOneCity = (city: string) => {
    return async (dispatch: Dispatch<AdminCitiesAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/cities/`, {city}, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
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
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/cities/${id}`, {city_name: city}, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
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


