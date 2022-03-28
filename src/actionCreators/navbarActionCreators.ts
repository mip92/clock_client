import {NavbarActionTypes, SetNavbarPagesAction} from "../types/navbarTypes";
import {NavBarLink} from "../types/mainInterfacesAndTypes";




export const setNavbarPages = (arr: NavBarLink[]): SetNavbarPagesAction => {
    return {
        type: NavbarActionTypes.SET_PAGES,
        payload: {payload:arr}
    }
}



