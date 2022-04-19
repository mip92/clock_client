import {NavbarActionTypes, SetNavbarPagesAction} from "../types/navbarTypes";
import {setLinks} from "../utils/setLinks";

export const setNavbarPages = (role : string | null, id: number | null): SetNavbarPagesAction => {
    const links = setLinks(role, id)
    return {
        type: NavbarActionTypes.SET_PAGES,
        payload: {payload:links}
    }
}



