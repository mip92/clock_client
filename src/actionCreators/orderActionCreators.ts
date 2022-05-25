import {Dispatch} from "react"
import $api from "../http";
import {MyError, Time} from "../types/mainInterfacesAndTypes";
import {
    FetchAction,
    FetchErrorAction,
    OrderAction,
    OrderActionTypes,
    SetOrder
} from "../types/orderTypes";


export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: OrderActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error: MyError | null): FetchErrorAction => {
    return {
        type: OrderActionTypes.FETCH_ERROR,
        payload: {payload: error}
    }
}

export const setOrder = (cityId: number, dateTime, clockSize, email, name, pictures): SetOrder => {
    return {
        type: OrderActionTypes.SET_ORDER,
        payload: {
            currentCity: cityId,
            dateTime: dateTime,
            clockSize: clockSize,
            email: email,
            name: name,
            pictures: pictures
        }
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
            dispatch(fetchError(err))
        }
    }
}


