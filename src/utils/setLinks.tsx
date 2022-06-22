import {NavBarLink} from "../types/mainInterfacesAndTypes";
import {Role} from "../enums/Roles";

export const setLinks = (role: string | null) => {
    const adminLinks: NavBarLink[] = [
        {to: '/menu/cities', name: 'Cities'},
        {to: '/menu/masters', name: 'Masters'},
        {to: '/menu/users', name: 'Users'},
        {to: '/menu/orders', name: 'Orders'},
        {to:'/menu/statistics', name: 'Statistics'},
    ]
    const masterLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"},
        {to: `/MyWorkplace`, name: 'My Workplace'},
        {to: `/Calendar`, name: 'My Calendar'}
    ]
    const userLinks: NavBarLink[] = [
        {to: '/blog', name: "Blog"},
        {to: `/MyOffice`, name: 'My Office'}
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