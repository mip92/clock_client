import {NavbarAction, NavbarActionTypes, NavbarStateType} from "../../types/navbarTypes";

const initState: NavbarStateType = {
    pages: [{to: '/blog', name: "Blog"}]
}

export const navbarReducer = (state = initState, action: NavbarAction): NavbarStateType => {
    switch (action.type) {
        case NavbarActionTypes.SET_PAGES:
            return {...state, pages: action.payload.payload}
        default:
            return state
    }
}