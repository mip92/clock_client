import {NavbarAction, NavbarActionTypes, NavbarStateType} from "../../types/navbarTypes";
import StepperContainer from "../../components/Menu/StepperContainer";
import {NavBarLink} from "../../types/mainInterfacesAndTypes";

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