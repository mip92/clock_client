import {
    BooleanPayload, CorrectMondayPayload,
    ErrorOrNullPayload, FetchCalendarPayload, FormatPayload,
    MyError, StringPayload,
} from "./mainInterfacesAndTypes";
import {OrderInterface} from "../components/MyWorkplace/Calendar/MasterCalendarMonth";

export interface OneCalendarItem {
    orders: OrderInterface[],
    date: Date,
    id: number
}

interface OneDay{id: number, day: string};

export enum FORMAT{
    Week,
    Month
}
export const formats=[
    {id:1, format:FORMAT["Week"]},
    {id:2, format: FORMAT['Month']}
]

export interface CalendarStateType {
    calendar: OneCalendarItem[]
    isFetch: boolean
    error: null | MyError,
    dayOfWeek: OneDay[],
    correctMonday: string,
    format:FORMAT,
    numberOfWeek: number
}

export enum CalendarActionTypes {
    FETCH_START = "FETCH_START",
    FETCH_ERROR = "FETCH_ERROR",
    FETCH_CALENDAR = 'FETCH_CALENDAR',
    SET_CORRECT_MONDAY='SET_CORRECT_MONDAY',
    SET_FORMAT="SET_FORMAT"
}


export interface FetchAction {
    type: CalendarActionTypes.FETCH_START;
    payload: BooleanPayload
}

export interface SetFormatAction {
    type: CalendarActionTypes.SET_FORMAT;
    payload: FormatPayload
}

export interface FetchErrorAction {
    type: CalendarActionTypes.FETCH_ERROR;
    payload: ErrorOrNullPayload
}

export interface SetCorrectMondayAction {
    type: CalendarActionTypes.SET_CORRECT_MONDAY;
    payload: CorrectMondayPayload
}

export interface FetchCalendarAction {
    type: CalendarActionTypes.FETCH_CALENDAR;
    payload: FetchCalendarPayload
}


export type CalendarAction = FetchAction |
    FetchErrorAction |
    FetchCalendarAction |
    SetCorrectMondayAction |
    SetFormatAction