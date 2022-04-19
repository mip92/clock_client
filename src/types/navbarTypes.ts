import {
    NavBarLink,
    NavBarLinksPayload,
} from "./mainInterfacesAndTypes";

export interface NavbarStateType {
    pages: NavBarLink[]
}

export enum NavbarActionTypes {
    SET_PAGES = "SET_PAGES",
}


export interface SetNavbarPagesAction {
    type: NavbarActionTypes.SET_PAGES;
    payload: NavBarLinksPayload
}


export type NavbarAction = SetNavbarPagesAction