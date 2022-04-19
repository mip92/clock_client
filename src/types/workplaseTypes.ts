import {OrdersPayload} from "./mainInterfacesAndTypes";
import {Order} from "../store/reducers/workplaceReducer";

export interface WorkplaseStateType {
    orders: Order[] | null,
}

export enum WorkplaseActionTypes {
    SET_ORDERS="SET_ORDERS",
}

export interface SetOrderAction {
    type: WorkplaseActionTypes.SET_ORDERS;
    payload: OrdersPayload
}


export type WorkplaseAction = SetOrderAction