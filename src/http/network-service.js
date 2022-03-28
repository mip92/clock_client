import $api from "./index";
import {AuthActionTypes} from "../types/authTypes";

export default {
    /*setupInterceptors: (store) => {
        $api.interceptors.response.use(function (response) {
                return response;
            }, (async error => {
                    if (error.response.status == 401 && error.config) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('time')
                        return store.dispatch({type: AdminActionTypes.LOGOUT});
                    }
                    console.log(11111)
                    //throw error
                }
            )
        )
    }*/
};