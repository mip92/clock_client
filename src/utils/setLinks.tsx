import {NavBarLink} from "../types/mainInterfacesAndTypes";
import {Role} from "../enums/Roles";

export const setLinks = (role: string | null, id: number|null) => {
    const adminLinks: NavBarLink[] = [
        {to: '/menu/cities', name: 'Cities'},
        {to: '/menu/masters', name: 'Masters'},
        {to: '/menu/users', name: 'Users'},
        {to: '/menu/orders', name: 'Orders'}
    ]
    const masterLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"},
        {to: `/MyWorkplace/${id}`, name: 'My Workplace'}
    ]
    const userLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"},
        {to: `/MyOffice/${id}`, name: 'My Office'}
    ]
    const defaultLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"}
    ]
    switch (role) {
        case Role.ADMIN:
            return adminLinks;
        case Role.MASTER:
            return masterLinks;
        case Role.USER:
            return userLinks;
        default:
            return defaultLinks
    }
}