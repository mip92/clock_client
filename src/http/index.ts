import axios from "axios";
import {logout} from "../actionCreators/adminActionCreators";

const $api = axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`
})

/*$api.interceptors.response.use((config) => {
    return config;
}, (async error => {
    if (error.response.status == 401 && error.config) {

        localStorage.removeItem('token')
        localStorage.removeItem('time')
        return window.location.href = '/accessdenied'
    }
    throw error
}))
*/
$api.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api
