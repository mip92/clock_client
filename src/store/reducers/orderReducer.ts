
import {City, MyError, Time} from "../../types/mainInterfacesAndTypes";
import {OrderAction, OrderActionTypes, OrderStateType} from "../../types/orderTypes";

const initState: OrderStateType = {
    cities: [] as City[],
    isFetch: false,
    error: null,
    currentCity: 1,
    time: [
    {"id": 8, "time": "8:00"},
    {"id": 9, "time": "9:00"},
    {"id": 10, "time": "10:00"},
    {"id": 11, "time": "11:00"},
    {"id": 12, "time": "12:00"},
    {"id": 13, "time": "13:00"},
    {"id": 14, "time": "14:00"},
    {"id": 15, "time": "15:00"},
    {"id": 16, "time": "16:00"},
    {"id": 17, "time": "17:00"},
    {"id": 18, "time": "18:00"},
    {"id": 19, "time": "19:00"},
    {"id": 20, "time": "20:00"}
    ],
    currentTime: 1,
}

export const orderReducer = (state = initState, action: OrderAction): OrderStateType => {
    switch (action.type) {
        case OrderActionTypes.FETCH_START:
            return {...state, isFetch:action.payload.payload}
        case OrderActionTypes.FETCH_ERROR:
            return {...state, isFetch:false, error:action.payload.payload}
        case OrderActionTypes.SET_CITIES:
            return {...state, cities:action.payload.payload}
        case OrderActionTypes.SET_CURRENT_CITY:
            return {...state, currentCity:action.payload.payload}
        case OrderActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime:action.payload.payload}
        default:
            return state
    }
}