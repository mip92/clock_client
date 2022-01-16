import {AdminAction, AdminActionTypes, AdminStateType} from "../../types/adminTypes";

const initState: AdminStateType = {
    isAdminFound: false,
    isFetch: false,
    error: null,
    token: null,
    adminEmail: '',
    adminPassword:''
}

export const adminReducer = (state = initState, action: AdminAction): AdminStateType => {
    switch (action.type) {
        case AdminActionTypes.FETCH_START:
            return {...state, isFetch:action.payload.payload}
        case AdminActionTypes.FETCH_ERROR:
            return {...state, isFetch:false, error:action.payload.payload}
        case AdminActionTypes.SET_ADMIN_EMAIL:
            return {...state, adminEmail:action.payload.payload}
        case AdminActionTypes.SET_ADMIN_PASSWORD:
            return {...state, adminPassword:action.payload.payload}
        case AdminActionTypes.SET_TOKEN:
            return {...state, token:action.payload.payload}
        case AdminActionTypes.LOGIN:
            return {...state, token:action.payload.payload}
        case AdminActionTypes.LOGOUT:
            return {...state, token:null}
        default:
            return state
    }
}