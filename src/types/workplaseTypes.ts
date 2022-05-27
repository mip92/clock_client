import {DelPicturesPayload, OrdersPayload} from "./mainInterfacesAndTypes";
import {Order} from "../store/reducers/workplaceReducer";

export interface WorkplaseStateType {
    orders: Order[] | null,
}

export enum WorkplaseActionTypes {
    SET_ORDERS="SET_ORDERS",
    DEL_PICTURES="DEL_PICTURES"
}

export interface SetOrderAction {
    type: WorkplaseActionTypes.SET_ORDERS;
    payload: OrdersPayload
}

export interface DeletePicturesAction {
    type: WorkplaseActionTypes.DEL_PICTURES;
    payload: DelPicturesPayload
}

export type WorkplaseAction = SetOrderAction | DeletePicturesAction