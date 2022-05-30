import {WorkplaseAction, WorkplaseActionTypes, WorkplaseStateType} from "../../types/workplaseTypes";
import {City} from "../../types/mainInterfacesAndTypes";

interface InitialStateI {
    orders: Order[]
}

interface Master {
    id: number | null,
    name: string,
    email: string,
    rating: number | null,
    role: string,
    isActivated: boolean | null,
    isApproved: boolean | null,
    createdAt: string,
    updatedAt: string,
}

interface User {
    id: number | null,
    email: string,
    role: string,
    name: string,
    isActivated: boolean | null,
    createdAt: string,
    updatedAt: string
}

interface MasterBusyDate {
    id: boolean | null,
    masterId: boolean | null,
    dateTime: string,
    createdAt: string,
    updatedAt: string
}

export interface Picture {
    createdAt: string
    id: number
    path: string
    updatedAt: string
    url?: string
}

export interface OrderPicture {
    createdAt: string
    id: number
    orderId: number
    picture: Picture
    pictureId: number
    updatedAt: string
}

export interface Order {
    id: number | null,
    clockSize: number | null,
    originalCityName: '',
    dealPrice: number | null,
    userId: number | null,
    status: '',
    createdAt: '',
    updatedAt: '',
    masterBusyDateId: number | null,
    masterId: number | null,
    cityId: number | null,
    city: City,
    master: Master,
    user: User,
    master_busyDate: MasterBusyDate,
    orderPictures: OrderPicture[]
}

export const initStateWorkPlace: InitialStateI = {
    orders: [{
        id: null,
        clockSize: null,
        originalCityName: '',
        dealPrice: null,
        userId: null,
        status: '',
        createdAt: '',
        updatedAt: '',
        masterBusyDateId: null,
        masterId: null,
        cityId: null,
        city: {
            id: 1,
            cityName: '',
            price: 1,
            createdAt: '',
            updatedAt: ''
        },
        master: {
            id: null,
            name: '',
            email: '',
            rating: null,
            role: '',
            isActivated: null,
            isApproved: null,
            createdAt: '',
            updatedAt: ''
        },
        user: {
            id: null,
            email: '',
            role: '',
            name: '',
            isActivated: null,
            createdAt: '',
            updatedAt: ''
        },
        master_busyDate: {
            createdAt: '',
            dateTime: '',
            id: null,
            masterId: null,
            updatedAt: ''
        },
        orderPictures: []
    }]
}

export const workplaseReducer = (state = initStateWorkPlace, action: WorkplaseAction): InitialStateI => {
    switch (action.type) {
        case WorkplaseActionTypes.SET_ORDERS:
            return {...state, orders: action.payload.payload}
        case WorkplaseActionTypes.DEL_PICTURES:
            return {...state, orders: state.orders.map((order, index)=>{
                    if (order.id===action.payload.payload.orderId) return {...order,
                        orderPictures: state.orders[index].orderPictures.filter((orderPicture)=>{
                            return orderPicture.picture.id!==action.payload.payload.arrayPictureId[0] &&
                                orderPicture.picture.id!==action.payload.payload.arrayPictureId[1] &&
                                orderPicture.picture.id!==action.payload.payload.arrayPictureId[2] &&
                                orderPicture.picture.id!==action.payload.payload.arrayPictureId[3] &&
                                orderPicture.picture.id!==action.payload.payload.arrayPictureId[4]
                        })}
                    return order
                })}
        default:
            return state
    }
}
