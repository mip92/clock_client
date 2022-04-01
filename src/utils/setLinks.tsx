import {NavBarLink} from "../types/mainInterfacesAndTypes";

export const setLinks = (role: string | null, id: number|null) => {
    const adminLinks: NavBarLink[] = [
        {to: '/menu/cities', name: 'Города'},
        {to: '/menu/masters', name: 'Мастера'},
        {to: '/menu/users', name: 'Пользователи'},
        {to: '/menu/orders', name: 'Заказы'}
    ]
    const masterLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"},
        {to: `/MyWorkplace/${id}`, name: 'Мое рабочее место'}
    ]
    const userLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"},
        {to: `/MyOffice/${id}`, name: 'Мой кабинет'}
    ]
    const defaultLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"}
    ]
    switch (role) {
        case "ADMIN":
            return adminLinks;
            break;
        case "MASTER":
            return masterLinks;
            break;
        case "USER":
            return userLinks;
            break;
        default:
            return defaultLinks
    }
}