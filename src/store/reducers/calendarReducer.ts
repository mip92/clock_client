import {CalendarAction, CalendarActionTypes, CalendarStateType, OneCalendarItem} from "../../types/calendarTypes";


const initState: CalendarStateType = {
    calendar: [{} as OneCalendarItem],
    dayOfWeek:[{id: 1, day: 'Mon'}, {id: 2, day: "Tue"}, {id: 3, day: "Wed"}, {id: 4, day: "Thu"},
        {id: 5, day: " Fri"}, {id: 6, day: "Sat"}, {id: 7, day: "Sun"}],
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