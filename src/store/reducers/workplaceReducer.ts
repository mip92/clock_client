import {WorkplaseAction, WorkplaseActionTypes, WorkplaseStateType} from "../../types/workplaseTypes";

const initState: WorkplaseStateType = {
    orders: [{
        orderId: null,
        dateTime: '',
        clockSize: null,
        userId: null,
        userEmail: '',
        userName: '',
        masterId: null,
        masterEmail: '',
        masterName: '',
        cityId: null,
        cityName: '',
        dealPrice: null,
        statusId : null
    }]
}

export const workplaseReducer = (state = initState, action: WorkplaseAction): WorkplaseStateType => {
    switch (action.type) {
        case WorkplaseActionTypes.SET_ORDERS:
            return {...state, orders: action.payload.payload}
        default:
            return state
    }
}