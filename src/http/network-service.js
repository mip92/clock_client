import $api from "./index";
import {AdminActionTypes} from "../types/adminTypes";

export default {
    setupInterceptors: (store) => {
        $api.interceptors.response.use(function (response) {
                return response;
            }, (async error => {
                    if (error.response.status == 401 && error.config) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('time')
                        store.dispatch({ type: AdminActionTypes.LOGOUT});
                    }
                    throw error

                }
            )
        )
    }
};