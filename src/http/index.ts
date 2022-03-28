import axios from "axios";
import {store} from '../store/index'
import {AdminActionTypes} from "../types/adminTypes";
const $api = axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`
})

$api.interceptors.response.use((config) => {
    return config;
}, (async error => {
    if (error.response.status == 401 && error.config) {
        localStorage.removeItem('token')
        store.dispatch({type: AdminActionTypes.STATUS, payload:{payload:401}});
        store.dispatch({type: AdminActionTypes.LOGOUT});
    }
    throw error
}))

$api.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api
