import {RemovePicturesPayload, OrdersPayload, ChangeStatusPayload} from "./mainInterfacesAndTypes";
import {Order} from "../store/reducers/workplaceReducer";

export interface WorkplaseStateType {
    orders: Order[] | null,
}

export enum WorkplaseActionTypes {
    SET_ORDERS = "SET_ORDERS",
    DEL_PICTURES = "DEL_PICTURES",
    CHANGE_STATUS = "CHANGE_STATUS"
}

export interface SetOrderAction {
    type: WorkplaseActionTypes.SET_ORDERS;
    payload: OrdersPayload
}

export interface DeletePicturesAction {
    type: WorkplaseActionTypes.DEL_PICTURES;
    payload: RemovePicturesPayload
}

export interface ChangeStatusAction {
    type: WorkplaseActionTypes.CHANGE_STATUS;
    payload: ChangeStatusPayload
}

export type WorkplaseAction = SetOrderAction | DeletePicturesAction | ChangeStatusAction