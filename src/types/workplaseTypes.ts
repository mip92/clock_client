import {
    BooleanPayload,
    NumberPayload,
    OrdersPayload,
    StringOrNullPayload,
    StringPayload
} from "./mainInterfacesAndTypes";
import {OrderInterface} from "../components/Admin/Order";

export interface WorkplaseStateType {
    orders: OrderInterface[] | null,
}

export enum WorkplaseActionTypes {
    SET_ORDERS="SET_ORDERS",
}

export interface SetOrderAction {
    type: WorkplaseActionTypes.SET_ORDERS;
    payload: OrdersPayload
}


export type WorkplaseAction = SetOrderAction