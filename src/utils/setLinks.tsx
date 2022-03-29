import {NavBarLink} from "../types/mainInterfacesAndTypes";

export const setLinks = (role: string | null) => {
    const adminLinks: NavBarLink[] = [
        {to: '/menu/cities', name: 'Города'},
        {to: '/menu/masters', name: 'Мастера'},
        {to: '/menu/users', name: 'Пользователи'},
        {to: '/menu/orders', name: 'Заказы'}
    ]
    const masterLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"},
        {to: '/menu/myWorks', name: 'Заказы'}
    ]
    const userLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"},
        {to: '/menu/myOrders', name: 'Заказы'}
    ]
    const defaultLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"}
    ]
    switch (role) {
        case "ADMIN":
            return adminLinks;
            break;
        case "Master":
            return masterLinks;
            break;
        case "USER":
            return userLinks;
            break;
        default:
            return defaultLinks
    }
}