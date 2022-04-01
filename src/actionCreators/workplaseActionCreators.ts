import {OrderInterface} from "../components/Admin/Order";
import {SetOrderAction, WorkplaseActionTypes} from "../types/workplaseTypes";


export const setOrders = (orders: OrderInterface[]): SetOrderAction => {
    return {
        type: WorkplaseActionTypes.SET_ORDERS,
        payload: {payload: orders}
    }
}