import {Dispatch} from "react"

import {
    AdminMasterAction,
    AdminMastersActionTypes,
    FetchAction,
    FetchErrorAction,
    SetMasterNameAction
} from "../types/adminMasterTypes";
import {AdminAction, AdminActionTypes} from "../types/adminTypes";
import $api from "../http";



export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: AdminMastersActionTypes.FETCH_START,
        payload: {payload:bol}
    }
}
export const fetchError = (error?: string | null): FetchErrorAction => {
    return {
        type: AdminMastersActionTypes.FETCH_ERROR,
        payload:{payload:error || "An error occurred while loading"}
    }
}

export const setMasterName = (masterName: string):  SetMasterNameAction=> {
    return {
        type: AdminMastersActionTypes.SET_MASTER_NAME,
        payload: {payload:masterName}
    }
}

export const fetchMasters = () => {
    return async (dispatch: Dispatch<AdminMasterAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.get(`/masters`,)

            dispatch({
                type: AdminMastersActionTypes.FETCH_MASTERS,
                payload: {payload: response.data.rows},
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch(fetchError(error))
            setTimeout(async () => {
                dispatch(fetchError(null))
            }, 2000)
        }
    }
}

export const delOneMaster = (id: number) => {
    return async (dispatch: Dispatch<AdminMasterAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.delete(`/masters/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch({
                type: AdminMastersActionTypes.DELETE_MASTER,
                payload: {payload: response.data.master},
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch(fetchError(error))
            setTimeout(async () => {
                dispatch(fetchError(null))
            }, 2000)
        }
    }
}
export const addOneMaster = (name: string, email:string, arrayCurrentCities:number[]) => {
    return async (dispatch: Dispatch<AdminMasterAction | AdminAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.post(`/masters/`, {name, email, cities_id:String(arrayCurrentCities)})
            dispatch({
                type: AdminMastersActionTypes.ADD_MASTER,
                payload: {payload:response.data},
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            if(e.request.status===401) {
                localStorage.removeItem('token')
                localStorage.removeItem('time')
                return dispatch({
                    type: AdminActionTypes.SET_TOKEN,
                    payload:  {payload: null}
                })
            }
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch(fetchError(error))
            setTimeout(async () => {
                dispatch(fetchError(null))
            }, 2000)
        }
    }
}
export const changeMaster = (id:number, name:string, email:string, cities_id:number[]) => {
    return async (dispatch: Dispatch<AdminMasterAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.put(`/masters/`, {id,name,email,cities_id:String(cities_id)})
            dispatch({
                type: AdminMastersActionTypes.CHANGE_MASTER_NAME,
                master:{payload: response.data}
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
        }
    }
}


