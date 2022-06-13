import {
    CalendarAction,
    CalendarActionTypes, CalendarStateType,
    FetchAction, FetchCalendarAction,
    FetchErrorAction, OneCalendarItem
} from "../types/calendarTypes";
import {Dispatch} from "react";
import $api from "../http";


import {MyError} from "../types/mainInterfacesAndTypes";

export const setCalendar = (data:OneCalendarItem[]): FetchCalendarAction => {
    return {
        type: CalendarActionTypes.FETCH_CALENDAR,
        payload: {payload: data}
    }
}

export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: CalendarActionTypes.FETCH_START,
        payload: {payload: bol}
    }
}
export const fetchError = (error: MyError | null): FetchErrorAction => {
    return {
        type: CalendarActionTypes.FETCH_ERROR,
        payload: {payload: error}
    }
}

export const fetchCalendar = (masterId: number,month:string)=> {
    return async (dispatch: Dispatch<CalendarAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.get<OneCalendarItem[]>(`/calendar/month?masterId=${masterId}&correctData=${month}`)
            dispatch(setCalendar(response.data))
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

export const fetchWeek = (masterId: number,correctMonday:string)=> {
    return async (dispatch: Dispatch<CalendarAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.get<OneCalendarItem[]>(`/calendar/week?masterId=${masterId}&correctMonday=${correctMonday}`)
            dispatch(setCalendar(response.data))
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