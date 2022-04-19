import {SetOrderAction, WorkplaseActionTypes} from "../types/workplaseTypes";
import {Order} from "../store/reducers/workplaceReducer";


export const setOrders = (orders:Order[]): SetOrderAction => {
    return {
        type: WorkplaseActionTypes.SET_ORDERS,
        payload: {payload: orders}
    }
}