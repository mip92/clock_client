import {Dispatch} from "react"
import $api from "../http";
import {MyError} from "../types/mainInterfacesAndTypes";
import {
    FetchAction,
    FetchErrorAction,
    OrderAction,
    OrderActionTypes,
    SetCurrentCity,
    SetCurrentTime
} from "../types/orderTypes";


export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: OrderActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error: MyError | null): FetchErrorAction  => {
    return {
        type: OrderActionTypes.FETCH_ERROR,
        payload:{payload:error}
    }
}

export const setCurrentCity = (city: number): SetCurrentCity  => {
    return {
        type: OrderActionTypes.SET_CURRENT_CITY,
        payload:{payload:city}
    }
}

export const setCurrentTime = (time: number): SetCurrentTime  => {
    return {
        type: OrderActionTypes.SET_CURRENT_TIME,
        payload:{payload:time}
    }
}

export const fetchCities = (offset: number, limit: number) => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.get(`/cities?offset=${offset}&limit=${limit}`)

            dispatch({
                type: OrderActionTypes.SET_CITIES,
                payload: {payload: response.data.rows}
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            const err = JSON.parse(e.request.responseText).message[0]
            console.log(err)
            dispatch(fetchError(err))
        }
    }
}


