import {AuthAction, AuthActionTypes, AuthStateType} from "../../types/authTypes";

const initState: AuthStateType = {
    isAdminFound: false,
    isFetch: false,
    error: null,
    token: null,
    authEmail: '',
    authPassword:'',
    status: 200
}

export const authReducer = (state = initState, action: AuthAction): AuthStateType => {
    switch (action.type) {
        case AuthActionTypes.FETCH_START:
            return {...state, isFetch:action.payload.payload}
        case AuthActionTypes.FETCH_ERROR:
            return {...state, isFetch:false, error:action.payload.payload}
        case AuthActionTypes.SET_ADMIN_EMAIL:
            return {...state, authEmail:action.payload.payload}
        case AuthActionTypes.SET_ADMIN_PASSWORD:
            return {...state, authPassword:action.payload.payload}
        case AuthActionTypes.SET_TOKEN:
            return {...state, token:action.payload.payload}
        case AuthActionTypes.LOGIN:
            return {...state, token:action.payload.payload}
        case AuthActionTypes.LOGOUT:
            return {...state, token:null}
        case AuthActionTypes.STATUS:
            return {...state, status:action.payload.payload}
        default:
            return state
    }
}