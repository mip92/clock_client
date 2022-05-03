import {Dispatch} from "react"

import {
    AdminMasterAction,
    AdminMastersActionTypes,
    FetchAction,
    FetchErrorAction, Master,
    SetMasterNameAction, SetMastersAction
} from "../types/adminMasterTypes";
import {AuthAction} from "../types/authTypes";
import $api from "../http";
import {MyError} from "../types/mainInterfacesAndTypes";

export const fetchStart = (bol: boolean): FetchAction => {
    return {
        type: AdminMastersActionTypes.FETCH_START,
        payload: {payload:bol}
    }
}
export const fetchError = (error?: any): FetchErrorAction => {
    return {
        type: AdminMastersActionTypes.FETCH_ERROR,
        payload:{payload:error}
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

export const setMaster = (masters: Master[]):  SetMastersAction=> {
    return {
        type: AdminMastersActionTypes.SET_MASTERS,
        payload: {payload:masters}
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

export const approveOneMaster = (id: number) => {
    return async (dispatch: Dispatch<AdminMasterAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.get(`/masters/approve/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch({
                type: AdminMastersActionTypes.APPROVE_MASTER,
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
/*export const addOneMaster = (name: string, email:string, arrayCurrentCities:number[]) => {
    return async (dispatch: Dispatch<AdminMasterAction | AuthAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await $api.get(`/masters/approve/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch({
                type: AdminMastersActionTypes.APPROVE_MASTER,
                payload: {payload: response.data.master},
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            if(e.request.status===401) {
                localStorage.removeItem('token')
                localStorage.removeItem('time')
                return dispatch({
                    type: AuthActionTypes.SET_TOKEN,
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
}*/
export const addOneMaster = (name: string, email:string, arrayCurrentCities:number[]) => {
    return async (dispatch: Dispatch<AdminMasterAction | AuthAction>) => {
        try {
            const citiesId=JSON.stringify(arrayCurrentCities)
            dispatch(fetchStart(true))
            await $api.post(`/masters/`, {name, email, citiesId:citiesId})
/*            dispatch({
                type: AdminMastersActionTypes.ADD_MASTER,
                payload: {payload:response.data},
            })*/
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
/*            if(e.request.status===401) {
                localStorage.removeItem('token')
                localStorage.removeItem('time')
                return dispatch({
                    type: AuthActionTypes.SET_TOKEN,
                    payload:  {payload: null}
                })
            }*/
            let error: MyError
            if (JSON.parse(e.request.responseText)?.hasOwnProperty('errors')===true)  error = JSON.parse(e.request.responseText).errors[0]
            else error = JSON.parse(JSON.parse(e.request.responseText).message)
            console.log(error)
            dispatch(fetchError(error))
        }
    }
}
export const changeMaster = (id:number, name:string, email:string, cities_id:number[], activateInput: Function) => {
    return async (dispatch: Dispatch<AdminMasterAction>) => {
        try {
            dispatch(fetchStart(true))
            const citiesId=JSON.stringify(cities_id)
            const response = await $api.put(`/masters/`, {id,name,email,citiesId/*:String(cities_id)*/})
            dispatch({
                type: AdminMastersActionTypes.CHANGE_MASTER_NAME,
                master:{payload: response.data}
            })
            dispatch(fetchStart(false))
            activateInput(false)
        } catch (e) {
            let error: MyError
            if (JSON.parse(e.request.responseText)?.hasOwnProperty('errors')===true)  error = JSON.parse(e.request.responseText).errors[0]
            else error = JSON.parse(JSON.parse(e.request.responseText).message)
            console.log(error)
            dispatch(fetchError(error))
        }
    }
}


