import {AdminMasterAction, AdminMastersActionTypes, AdminMasterStateType} from "../../types/adminMasterTypes";

const initState: AdminMasterStateType = {
    masters: [],
    newMaster: '',
    error: null,
    isFetch: false
}
export const adminMasterReducer = (state = initState, action: AdminMasterAction): AdminMasterStateType => {
    switch (action.type) {
        case AdminMastersActionTypes.FETCH_MASTERS:
            return {...state, masters: action.payload.payload}
        case AdminMastersActionTypes.SET_MASTERS:
            return {...state, masters: action.payload.payload}
        case AdminMastersActionTypes.FETCH_START:
            return {...state, isFetch: action.payload.payload}
        case AdminMastersActionTypes.FETCH_ERROR:
            return {...state, error: action.payload.payload}
        case AdminMastersActionTypes.DELETE_MASTER:
            return {...state, masters: state.masters.filter(master => master.id !== action.payload.payload.id)}
        case AdminMastersActionTypes.APPROVE_MASTER:
            return {...state, masters: state.masters.map(m=>{
                if (m.id==action.payload.payload.id) return {...m, isApproved:action.payload.payload.isApproved}
                return m
                })
                /*state.masters.map(master => {
                        if (master.id == action.payload.payload.id) return {
                            ...master,
                            isApproved: action.payload.payload.isApproved
                        }
                        else return master
                    }
                )*/
            }
        case AdminMastersActionTypes.SET_MASTER_NAME:
            return {...state, newMaster: action.payload.payload}
        case AdminMastersActionTypes.ADD_MASTER:
            return {...state, masters: [...state.masters, action.payload.payload]}
        case AdminMastersActionTypes.CHANGE_MASTER_NAME:
            return <AdminMasterStateType>{
                ...state,
                masters: state.masters.map(master => {
                        if (master.id === action.master.payload.id) return action.master.payload
                        else return master
                    }
                )
            }
        default:
            return state
    }
}