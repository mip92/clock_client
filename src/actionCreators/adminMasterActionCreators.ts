import axios from "axios"
import {Dispatch} from "react"

import {
    AdminMasterAction,
    AdminMastersActionTypes,
    fetchAction,
    fetchErrorAction,
    setMasterNameAction
} from "../types/adminMasterTypes";
import {AdminAction, AdminActionTypes} from "../types/adminTypes";



export const fetchStart = (bol: boolean): fetchAction => {
    return {
        type: AdminMastersActionTypes.FETCH_START,
        payload: {payload:bol}
    }
}
export const fetchError = (error?: string | null): fetchErrorAction => {
    return {
        type: AdminMastersActionTypes.FETCH_ERROR,
        payload:{payload:error || "An error occurred while loading"}
    }
}

export const setMasterName = (masterName: string):  setMasterNameAction=> {
    return {
        type: AdminMastersActionTypes.SET_MASTER_NAME,
        payload: {payload:masterName}
    }
}

export const fetchMasters = () => {
    return async (dispatch: Dispatch<AdminMasterAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/masters`,)

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
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/masters/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            console.log(response.data)
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
export const addOneMaster = (name: string, email:string, city_id:number) => {
    return async (dispatch: Dispatch<AdminMasterAction | AdminAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/masters/`, {name, email, city_id},{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch({
                type: AdminMastersActionTypes.ADD_MASTER,
                payload: {payload:response.data},
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            console.log(e)
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
export const changeMaster = (id:number, name:string, email:string, city_id:number) => {
    return async (dispatch: Dispatch<AdminMasterAction>) => {
        try {
            dispatch(fetchStart(true))
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/masters/`, {id,name,email,city_id},{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch({
                type: AdminMastersActionTypes.CHANGE_MASTER_NAME,
                master:{payload: response.data}
            })
            dispatch(fetchStart(false))
        } catch (e) {
            dispatch(fetchStart(false))
            console.log(e)
            /*const error = JSON.parse(e.request.responseText).message[0]
            dispatch(fetchError(error))
            setTimeout(async () => {
                dispatch(fetchError(null))
            }, 2000)*/
        }
    }
}


