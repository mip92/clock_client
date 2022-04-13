import {OrderInterface} from "../components/Admin/Order";
import {SetOrderAction, WorkplaseActionTypes} from "../types/workplaseTypes";
import {Order} from "../store/reducers/workplaceReducer";


export const setOrders = (orders:Order[]): SetOrderAction => {
    console.log(orders)
    return {
        type: WorkplaseActionTypes.SET_ORDERS,
        payload: {payload: orders}
    }
}