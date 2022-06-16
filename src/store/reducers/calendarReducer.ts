import {
    CalendarAction,
    CalendarActionTypes,
    CalendarStateType,
    FORMAT,
    OneCalendarItem
} from "../../types/calendarTypes";


const initState: CalendarStateType = {
    calendar: [{} as OneCalendarItem],
    dayOfWeek:[{id: 1, day: 'Mon'}, {id: 2, day: "Tue"}, {id: 3, day: "Wed"}, {id: 4, day: "Thu"},
        {id: 5, day: " Fri"}, {id: 6, day: "Sat"}, {id: 7, day: "Sun"}],
    isFetch: true,
    error: null,
    correctMonday: '',
    format: FORMAT.Month,
    numberOfWeek: 0
}


export const calendarReducer = (state = initState, action: CalendarAction): CalendarStateType => {
    switch (action.type) {
        case CalendarActionTypes.FETCH_CALENDAR:
            return {
                ...state,
                calendar: action.payload.payload
            }
        case CalendarActionTypes.SET_CORRECT_MONDAY:
            return {
                ...state,
                correctMonday:action.payload.payload.monday,
                numberOfWeek: action.payload.payload.numberOfWeek
            }
        case CalendarActionTypes.SET_FORMAT:
            return {
                ...state,
                format:action.payload.payload
            }
        case CalendarActionTypes.FETCH_ERROR:
            return {
                ...state,
                error:action.payload.payload
            }
        case CalendarActionTypes.FETCH_START:
            return {
                ...state,
                isFetch:action.payload.payload
            }
        default:
            return state
    }
}