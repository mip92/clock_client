import {
    BooleanPayload,
    ErrorOrNullPayload, FetchCalendarPayload,
    MyError,
} from "./mainInterfacesAndTypes";
import {OrderInterface} from "../components/MyWorkplace/Calendar/MasterCalendarMonth";

export interface OneCalendarItem {
    orders: OrderInterface[],
    date: Date,
    id: number
}

interface OneDay{id: number, day: string};

export interface CalendarStateType {
    calendar: OneCalendarItem[]
    isFetch: boolean
    error: null | MyError,
    dayOfWeek: OneDay[],
    correctMonday
}

export enum CalendarActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    FETCH_CALENDAR = 'FETCH_CALENDAR',
}


export interface FetchAction {
    type: CalendarActionTypes.FETCH_START;
    payload: BooleanPayload
}

export interface FetchErrorAction {
    type: CalendarActionTypes.FETCH_ERROR;
    payload: ErrorOrNullPayload
}

export interface FetchCalendarAction {
    type: CalendarActionTypes.FETCH_CALENDAR;
    payload: FetchCalendarPayload
}


export type CalendarAction = FetchAction |
    FetchErrorAction |
    FetchCalendarAction