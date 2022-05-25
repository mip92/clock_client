import {WorkplaseAction, WorkplaseActionTypes} from "../../types/workplaseTypes";
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
        }

    }]
}

export const workplaseReducer = (state = initStateWorkPlace, action: WorkplaseAction): InitialStateI => {
    switch (action.type) {
        case WorkplaseActionTypes.SET_ORDERS:
            return {...state, orders: action.payload.payload}
        default:
            return state
    }
}