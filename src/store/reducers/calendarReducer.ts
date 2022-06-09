import {CalendarAction, CalendarActionTypes, CalendarStateType, OneCalendarItem} from "../../types/calendarTypes";


const initState: CalendarStateType = {
    calendar: [{} as OneCalendarItem],
    isFetch: true,
    error: null
}


export const calendarReducer = (state = initState, action: CalendarAction): CalendarStateType => {
    switch (action.type) {
        case CalendarActionTypes.FETCH_CALENDAR:
            return {
                ...state,
                calendar: action.payload.payload
            }

        default:
            return state
    }
}