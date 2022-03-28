import {NavbarAction, NavbarActionTypes, NavbarStateType} from "../../types/navbarTypes";

const initState: NavbarStateType = {
    pages: [
        {
            to: '/menu/cities',
            name: 'Города'
        },
        {
            to: '/menu/masters',
            name: 'Мастера'
        },
        {
            to: '/menu/users',
            name: 'Пользователи'
        },
        {
            to: '/menu/orders',
            name: 'Заказы'
        }
    ]
}

export const navbarReducer = (state = initState, action: NavbarAction): NavbarStateType => {
    switch (action.type) {
        case NavbarActionTypes.SET_PAGES:
            return {...state, pages: action.payload.payload}
        default:
            return state
    }
}