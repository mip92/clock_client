import {Role} from "./Roles";
import {UrlByRole} from "../types/authTypes";

class RolesUrls {
    id;
    role;
    urls: UrlByRole;
    currentUrl;
    constructor(id:number | null) {
        this.urls = {
            [Role.USER]: `/myOffice/${id}`,
            [Role.MASTER]: `/MyWorkplace/${id}`,
            [Role.ADMIN]: `/menu/orders`,
        }
    }
    getUrl(role) {
        this.role = role
        const keys = Object.keys(this.urls);
        keys.forEach(key => {
            if (key==role) this.currentUrl= this.urls[key]
        });
        return this.currentUrl
    }
}

export default RolesUrls